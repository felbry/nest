const AV = require('leanengine')
var utils = require('../utils')
const axios = require('axios')

module.exports.create = function (opt) {
  let file = new AV.File(opt.originalname, opt.buffer)
  return file.save().then((file) => {
    return file.id
  }).then(fid => {
    let artical = new AV.Object('Artical')
    let user = AV.Object.createWithoutData('_User', opt.uid)
    let file = AV.Object.createWithoutData('_File', fid)
    artical.set('user', user)
    artical.set('file', file)
    if (opt.tid) {
      let tag = AV.Object.createWithoutData('Tag', opt.tid)
      artical.set('tag', tag)
    }
    artical.set('title', opt.title)
    return artical.save().then(result => {
      return {
        code: 0,
        data: {
          id: result.id
        }
      }
    })
  }).catch(utils.handleDBErr)
}

module.exports.updateByFile = function (opt) {
  let artical = new AV.Query('Artical')
  let oldFid = ''
  artical.include('file')
  // 1. 保留旧的文件id
  return artical.get(opt.aid).then(rs1 => {
    oldFid = rs1.get('file').id
    // 2. _File中保存新文件
    let file = new AV.File(opt.originalname, opt.buffer)
    return file.save()
  }).then(rs2 => {
    // 3. 替换新文件(及其它属性)
    let art = AV.Object.createWithoutData('Artical', opt.aid)
    art.set('file', rs2)
    if (opt.tid) {
      let tag = AV.Object.createWithoutData('Tag', opt.tid)
      art.set('tag', tag)
    }
    art.set('title', opt.title)
    return art.save()
  }).then(() => {
    // 4. 删除旧文件
    let oldFile = AV.Object.createWithoutData('_File', oldFid)
    return oldFile.destroy()
  }).then(() => {
    return {
      code: 0
    }
  }).catch(utils.handleDBErr)
}

module.exports.findAll = function (opt) {
  let query = new AV.Query('Artical')
  // 如果带tid就包含标签筛选
  if (opt.tid) {
    let tag = AV.Object.createWithoutData('Tag', opt.tid)
    query.equalTo('tag', tag)
  }
  query.descending('createdAt')
  query.include('user')
  query.include('tag')
  return query.count().then(count => count).then(count => {
    query.limit(20)
    // if (opt.page > 1) {
    //     query.skip((opt.page - 1) * 10);
    // }
    return query.find().then(results => {
      return {
        code: 0,
        data: {
          total: count,
          articals: results.map(val => {
            return {
              id: val.id,
              title: val.get('title'),
              author: val.get('user').get('nickName'),
              tag: val.get('tag') ? {
                id: val.get('tag').id,
                name: val.get('tag').get('name')
              } : { id: '' },
              avatarUrl: val.get('user').get('avatarUrl'),
              createdAt: val.createdAt,
              updatedAt: val.updatedAt
            }
          })
        }
      }
    })
  }).catch(utils.handleDBErr)
}

module.exports.find = function (opt) {
  let query = new AV.Query('Artical')
  query.include('file')
  query.include('user')
  return query.get(opt.id).then(rs1 => {
    return rs1
  }).then(artical => {
    let url = artical.get('file').get('url')
    let user = artical.get('user')
    let gender = user.get('gender')
    let nickName = user.get('nickName')
    return axios.get(url).then(rs2 => {
      return {
        code: 0,
        data: {
          title: artical.get('title'),
          gender,
          nickName,
          createdAt: artical.get('createdAt'),
          updatedAt: artical.get('updatedAt'),
          content: rs2.data
        }
      }
    })
  }).catch(utils.handleDBErr)
}

module.exports.createTag = function (opt) {
  let tag = new AV.Object('Tag')
  tag.set('name', opt.name)
  return tag.save().then(result => {
    return {
      code: 0,
      data: {
        id: result.id
      }
    }
  }).catch(utils.handleDBErr)
}

module.exports.findAllTag = function (opt) {
  let query = new AV.Query('Tag')
  return query.find().then(results => {
    return {
      code: 0,
      data: results.map(result => {
        return {
          id: result.id,
          name: result.get('name')
        }
      })
    }
  }).catch(utils.handleDBErr)
}

module.exports.createComment = function (opt) {

}
