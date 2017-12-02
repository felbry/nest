import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            item: 1
        },
        actions: {
            async fetchItem({ commit }, id) {
                commit('setItem', {
                    id: id
                });
            }
        },
        mutations: {
            setItem (state, payload) {
                state.item = payload.id;
            }
        }
    })
}