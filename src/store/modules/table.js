const table = {
  state: {
    tableConfig: [
      // {
      //   url: '',
      //   columns: ''
      // }
    ]
  },

  mutations: {
    SET_TABLECONFIG: (state, config) => {
      state.tableConfig.push(config)
    }
  },

  actions: {
    ChangeTableConfig({ commit }, config) {
      return new Promise((resolve, reject) => {
        commit('SET_TABLECONFIG', config)
        resolve()
      })
    }
  }
}

export default table
