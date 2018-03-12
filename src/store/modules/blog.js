import * as types from '../mutation-types';
import {
    GET_ARTICAL_LIST,
    GET_ARTICAL,
    GET_TAG_LIST
} from '../../../api';

const ACTIONS = {
    getArticalList({ commit }, tid) {
        return GET_ARTICAL_LIST({
            tid: tid
        }).then(res => {
            commit(types.SET_ARTICAL_LIST, res.data);
        });
    },
    getArtical({ commit }, id) {
        return GET_ARTICAL({
            id: id
        }).then(res => {
            commit(types.SET_ARTICAL, res.data);
        });
    },
    getTagList({ commit }) {
        return GET_TAG_LIST().then(res => {
            commit(types.SET_TAG_LIST, res.data);
        });
    },
};

const MUTATIONS = {
    [types.SET_ARTICAL_LIST] (state, payload) {
        state.articalList = payload;
    },
    [types.SET_ARTICAL] (state, payload) {
        state.artical = payload;
    },
    [types.SET_TAG_LIST] (state, payload) {
        state.tagList = payload;
    },
};

export default {
    state: () => ({
        articalList: [],
        artical: '',
        tagList: []
    }),
    mutations: MUTATIONS,
    actions: ACTIONS    
}