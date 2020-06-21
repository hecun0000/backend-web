import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const types = {
  'SET_USER_INFO': 'SET_USER_INFO',
  'SET_RANK': 'SET_RANK'
}

const state = {
  groups: [1],
  appName: '后台管理系统',
  logo: 'http://static.hecun.site/hecun.321c947a.jpg'
}

const mutations = {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  changeUserInfo ({ commit }, info) {
    let userInfo = `this is ${info}`
    commit(types.SET_USER_INFO, userInfo)
  }
}

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules,
  state,
  actions,
  mutations,
  getters
})
