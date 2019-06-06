import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        return new Promise((res) => {
          setTimeout(() => {
            commit('setItem', {test: 'test data'});
            res();
          }, 3000)
        })
      }
    },
    mutations: {
      setItem (state, payload) {
        // Vue.set(state.items, id, item)
        state.items = {...state.items, ...payload};
      }
    }
  })
}