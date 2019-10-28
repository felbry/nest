const FS = require('fs')
const EXPRESS = require('express')
const hljs = require('highlight.js')
const ROUTER = EXPRESS.Router()
const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default
const MD_IT = require('markdown-it')
const MD = new MD_IT({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value
    }
    return '' // use external default escaping
  }
})
  .use(
    markdownItTocAndAnchor,
    {
      anchorLink: false,
      tocLastLevel: 3
    }
  )
  .use(require('markdown-it-footnote'))
const MULTER = require('multer')
var upload = MULTER()
const JWT = require('../middleware/auth')

const FILE_MODEL = require('../model/file.js')
const ARTICAL_MODEL = require('../model/artical.js')
const GET_FILE_MD5 = require('../tools/get-file-md5.js')

// 创建、获取博客
ROUTER.route('/articals')
  .get((req, res) => {
    let { page, pageSize } = req.body
    return Promise.all([
      ARTICAL_MODEL
        .find()
        .limit(page)
        .skip((page - 1) * pageSize)
        .populate('author')
        .exec(),
      ARTICAL_MODEL
        .find()
        .estimatedDocumentCount()
        .exec()
    ])
      .then(([articalListRet, total]) => {
        res.json({
          code: 0,
          data: {
            articalList: articalListRet,
            total
          }
        })
      })
  })
  .post(
    JWT,
    upload.single('file'),
    (req, res) => {
      let { title } = req.body
      let { originalname, buffer, mimetype, size, encoding } = req.file
      let { uid } = req.user
      let md5
      return GET_FILE_MD5(buffer)
        .then(md5Ret => {
          md5 = md5Ret
          return FILE_MODEL
            .findOne({
              md5
            })
        })
        .then(fileRet => {
          let publicPath = `/assets/articals/${md5}`
          if (fileRet) return fileRet
          FS.writeFileSync(process.cwd() + publicPath, buffer)
          return FILE_MODEL
            .create({
              mimetype,
              size,
              encoding,
              originalName: originalname,
              publicPath,
              md5
            })
        })
        .then(fileRet => {
          return ARTICAL_MODEL
            .create({
              title,
              file: fileRet._id,
              author: uid
            })
        })
        .then(articalRet => {
          res.json({
            code: 0
          })
        })
    }
  )

// 获取博客详情
ROUTER.route('/articals/:id')
  .get((req, res) => {
    let { id } = req.params
    let { isOrigin } = req.query
    return ARTICAL_MODEL
      .findById(id)
      .populate('author')
      .populate('file')
      .then(articalRet => {
        let content = FS.readFileSync(process.cwd() + articalRet.file.publicPath, 'utf-8')
        let retObj = {
          title: articalRet.title,
          content,
          gender: articalRet.author.gender,
          nickName: articalRet.author.nickName,
          createdAt: articalRet.createdAt,
          updatedAt: articalRet.updatedAt
        }
        if (isOrigin) {
          return res.json({
            code: 0,
            data: retObj
          })
        }
        MD.set({
          tocCallback: function (tocMarkdown, tocArray, tocHtml) {
            // console.log(tocHtml)
          }
        })
        retObj.content = MD.render(content, { encoding: 'utf-8' })
        res.json({
          code: 0,
          data: retObj
        })
      })
  })
  .put(
    JWT,
    upload.single('file'),
    (req, res) => {
      let { id } = req.params
      let { title } = req.body
      let { originalname, buffer, mimetype, size, encoding } = req.file
      let md5
      return GET_FILE_MD5(buffer)
        .then(md5Ret => {
          md5 = md5Ret
          return FILE_MODEL
            .findOne({
              md5
            })
        })
        .then(fileRet => {
          let publicPath = `/assets/articals/${md5}`
          if (fileRet) return fileRet
          FS.writeFileSync(process.cwd() + publicPath, buffer)
          return FILE_MODEL
            .create({
              mimetype,
              size,
              encoding,
              originalName: originalname,
              publicPath,
              md5
            })
        })
        .then(fileRet => {
          return ARTICAL_MODEL
            .findByIdAndUpdate(id, {
              title,
              file: fileRet._id
            })
        })
        .then(() => {
          res.json({
            code: 0
          })
        })
    }
  )

// 创建、获取标签
// ROUTER.route('/tags')
//   .get((req, res) => {
//     blog.findAllTag().then(result => {
//       utils.handleResponse(result, res)
//     })
//   })
//   .post(jwt, (req, res) => {
//     blog.createTag(req.body).then(result => {
//       utils.handleResponse(result, res)
//     })
//   })

// 创建评论
// ROUTER.route('/comments')
//   .post(jwtFriends, (req, res) => {
//     blog.createTag(req.body).then(result => {
//       utils.handleResponse(result, res)
//     })
//   })

module.exports = ROUTER
