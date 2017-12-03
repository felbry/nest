import * as types from '../mutation-types';
import {
    GET_ARTICAL_LIST
} from '../../../api';

const STATE = {
    articalList: []
};

const ACTIONS = {
    getArticalList({ commit }) {
        return GET_ARTICAL_LIST().then(res => {
            commit(types.SET_ARTICAL_LIST, res);
        });
    }
};

const MUTATIONS = {
    [types.SET_ARTICAL_LIST] (state, payload) {
        state.articalList = payload;
    },
};

export default {
    state: STATE,
    mutations: MUTATIONS,
    actions: ACTIONS    
}