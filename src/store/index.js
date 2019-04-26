import Vue from 'vue'
import Vuex from 'vuex'

import table from './modules/table'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    table
  },
  getters
})

export default store
