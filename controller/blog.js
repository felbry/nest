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
      let publicPath = `/assets/articals/${originalname}`
      FS.writeFileSync(process.cwd() + publicPath, buffer)
      return FILE_MODEL
        .create({
          mimetype,
          size,
          encoding,
          originalName: originalname,
          publicPath
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
ROUTER.get('/articals/:id', (req, res) => {
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
          console.log(tocHtml)
        }
      })
      retObj.content = MD.render(content, { encoding: 'utf-8' })
      res.json({
        code: 0,
        data: retObj
      })
    })
  // blog.find({
  //   id: req.params.id
  // }).then(result => {
  //   if (req.query.isOrigin) res.json(result)
  //   let toc = []
  //   let tocSort = []
  //   MD.set({
  //     tocCallback: function (tocMarkdown, tocArray, tocHtml) {
  //       tocSort = tocArray.slice()
  //       try {
  //         tocArray.forEach((h, i) => {
  //           if (h.level === 1) {
  //             h.children = []
  //             let j = 1
  //             if (i !== tocArray.length - 1) {
  //               while (tocArray[i + j] && tocArray[i + j].level === 2) {
  //                 tocArray[i + j].children = []
  //                 h.children.push(tocArray[i + j])
  //                 j++
  //               }
  //               let k = 0
  //               while (tocArray[i + j + k] & tocArray[i + j + k].level === 3) {
  //                 h.children[h.children.length - 1].children.push(tocArray[i + j + k])
  //                 k++
  //               }
  //             }
  //             toc.push(h)
  //           }
  //         })
  //       } catch (err) {
  //         console.log('toc chilren convert err: ' + err)
  //       }
  //     }
  //   })
  //   try {
  //     result.data.content = MD.render(result.data.content, { encoding: 'utf-8' })
  //     result.data.toc = toc
  //     result.data.tocSort = tocSort
  //     res.json(result)
  //   } catch (err) {
  //     res.status(500).end('markdown-it toc convert error: ' + err)
  //   }
  // })
})

// 博客更新 -> 文件替换
// ROUTER.post('/articals/update', jwt, upload.single('file'), (req, res) => {
//   blog.updateByFile(Object.assign(req.body, req.file, req.user)).then(result => {
//     utils.handleResponse(result, res)
//   })
// })

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
