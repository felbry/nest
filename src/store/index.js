import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';

import blog from './modules/blog';
import photo from './modules/photo';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        actions,
        modules: {
            blog,
            photo
        }
    });
}