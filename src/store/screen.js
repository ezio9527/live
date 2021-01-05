const state = {
  screen: ''
}

const getters = {
  getScreenIsPc (state) {
    return state.screen === 'person-computer'
  },
  getScreenIsMobile (state) {
    return state.screen === 'mobile'
  }
}

const mutations = {
  setScreenByPc (state) {
    state.screen = 'person-computer'
  },
  setScreenByMobile (state) {
    state.screen = 'mobile'
  }
}

const actions = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
