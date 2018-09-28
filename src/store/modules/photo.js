import * as types from '../mutation-types'
import {
  GET_PHOTO_LIST,
  GET_PHOTO_TAG_LIST
} from '../../../api'

const ACTIONS = {
  getPhotoList ({ commit }, opt) {
    return GET_PHOTO_LIST(opt).then(res => {
      commit(types.SET_PHOTO_LIST, res.data.photos)
      commit(types.SET_PHOTO_TOTAL, res.data.total)
    })
  },
  getPhotoTagList ({ commit }) {
    return GET_PHOTO_TAG_LIST().then(res => {
      commit(types.SET_PHOTO_TAG_LIST, res.data)
    })
  }
}

const MUTATIONS = {
  [types.SET_PHOTO_LIST] (state, payload) {
    state.photoList = payload
  },
  [types.SET_PHOTO_TAG_LIST] (state, payload) {
    state.tagList = payload
  },
  [types.SET_PHOTO_TOTAL] (state, payload) {
    state.total = payload
  }
}

export default {
  state: () => ({
    total: 0,
    photoList: [],
    tagList: []
  }),
  mutations: MUTATIONS,
  actions: ACTIONS
}
