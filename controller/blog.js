const EXPRESS = require('express')
const hljs = require('highlight.js')
const ROUTER = EXPRESS.Router()
const MAIL = require('../tools/mail')
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
const MULTER = require('multer')
var upload = MULTER()

var blog = require('../model/blog')
var jwt = require('../middleware/auth')
var jwtFriends = require('../middleware/authFriends')
var utils = require('../utils')

// 创建、获取博客
ROUTER.route('/articals')
  .get((req, res) => {
    blog.findAll({
      tid: req.query.tid,
      page: req.query.page || 1
    }).then(result => {
      utils.handleResponse(result, res)
    })
  })
  .post(jwt, upload.single('file'), (req, res) => {
    blog.create(Object.assign(req.body, req.file, req.user)).then(result => {
      utils.handleResponse(result, res)
    })
  })

// 获取博客详情
ROUTER.get('/articals/:id', (req, res) => {
  blog.find({
    id: req.params.id
  }).then(result => {
    if (req.query.isOrigin) res.json(result)
    let toc = []
    let tocSort = []
    MD.set({
      tocCallback: function (tocMarkdown, tocArray, tocHtml) {
        tocSort = tocArray.slice()
        try {
          tocArray.forEach((h, i) => {
            if (h.level === 1) {
              h.children = []
              let j = 1
              if (i !== tocArray.length - 1) {
                while (tocArray[i + j] && tocArray[i + j].level === 2) {
                  tocArray[i + j].children = []
                  h.children.push(tocArray[i + j])
                  j++
                }
                let k = 0
                while (tocArray[i + j + k] & tocArray[i + j + k].level === 3) {
                  h.children[h.children.length - 1].children.push(tocArray[i + j + k])
                  k++
                }
              }
              toc.push(h)
            }
          })
        } catch (err) {
          console.log('toc chilren convert err: ' + err)
        }
      }
    })
    try {
      result.data.content = MD.render(result.data.content, { encoding: 'utf-8' })
      result.data.toc = toc
      result.data.tocSort = tocSort
      res.json(result)
    } catch (err) {
      res.status(500).end('markdown-it toc convert error: ' + err)
    }
  }).catch(err => { console.log(err) })
})

// 博客更新 -> 文件替换
ROUTER.post('/articals/update', jwt, upload.single('file'), (req, res) => {
  blog.updateByFile(Object.assign(req.body, req.file, req.user)).then(result => {
    utils.handleResponse(result, res)
  })
})

// 创建、获取标签
ROUTER.route('/tags')
  .get((req, res) => {
    blog.findAllTag().then(result => {
      utils.handleResponse(result, res)
    })
  })
  .post(jwt, (req, res) => {
    blog.createTag(req.body).then(result => {
      utils.handleResponse(result, res)
    })
  })

// 创建评论
ROUTER.route('/comments')
  .post(jwtFriends, (req, res) => {
    blog.createTag(req.body).then(result => {
      utils.handleResponse(result, res)
    })
  })

// 激活leancloud
ROUTER.route('/active')
  .get((req, res) => {
    let date = new Date()
    if (date.getHours() === 8 && date.getMinutes() < 5) {
      MAIL({
        receiver: '505792925@qq.com',
        subject: 'Good Morning',
        html: `<p>当前时间为：<b>${new Date()}</b></p>`
      })
        .then(() => res.end('success'))
        .catch(() => res.end('email send error'))
    } else {
      res.end('other time')
    }
  })

module.exports = ROUTER
