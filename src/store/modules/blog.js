import * as types from '../mutation-types';
import {
    GET_ARTICAL_LIST,
    GET_ARTICAL,
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
};

const MUTATIONS = {
    [types.SET_ARTICAL_LIST] (state, payload) {
        state.articalList = payload;
    },
    [types.SET_ARTICAL] (state, payload) {
        state.artical = payload;
    },
};

export default {
    state: () => ({
        articalList: [],
        artical: ''
    }),
    mutations: MUTATIONS,
    actions: ACTIONS    
}