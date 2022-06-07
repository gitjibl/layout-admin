
const state = {
  userInfo:{},
  userPermissions:{}
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_USERPERMISSIONS: (state, userPermissions) => {
    state.userPermissions = userPermissions
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USERINFO',userInfo)
  },
  setUserPermissions({ commit }, userPermissions) {
    commit('SET_USERPERMISSIONS',userPermissions)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
