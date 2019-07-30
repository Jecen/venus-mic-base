import { http } from '../../../app'

// 定义action type
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_OSS = 'USER_LOGIN_OSS'
export const USER_LOGIN_WID = 'USER_LOGIN_WID'
export const USER_LOGOUT = 'USER_LOGOUT'

// app config
export const GET_APP_CONFIG = 'GET_APP_CONFIG'

// 指定对应api
export const api = {
  [USER_LOGIN]: '/login.action',
  [USER_LOGOUT]: '/logout.action',
  [USER_LOGIN_OSS]: '/externallogin.action',
  [USER_LOGIN_WID]: '/token/login.action',
  [GET_APP_CONFIG]: '/address/addressForGis/getAddressForGis',
}

// 初始化store对象
const state = {
  userInfo: { name: 'aaa', age: 18 },
  token: '',
  rememberInfo: {
    username: '',
    password: '',
  },
  config: {},
  enterType: 'byLogin',
  permission: {

  },
}

// 异步操作放到action handler里
const actions = {
  doLogin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      http
        .post(api[USER_LOGIN], JSON.stringify(payload))
        .then(rst => {
          if (rst.success) {
            commit('SET_USER_INFO', rst.user)
            commit('SET_TOKEN', rst.token)
            dispatch('getAppConfig')
            commit('updateEnterType', 'byLogin')
            resolve(rst)
          } else {
            reject(rst.msg)
          }
        })
        .catch(error => {
          console.log(error)
          reject()
        })
    })
  },
  doLoginSso({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      http
        .get(api[USER_LOGIN_OSS], payload)
        .then(rst => {
          if (rst.success) {
            commit('SET_USER_INFO', rst.user)
            commit('SET_TOKEN', rst.token)
            dispatch('getAppConfig')
            commit('updateEnterType', 'byLogin')
            resolve(rst)
          } else {
            reject(rst.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  doLoginWid({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      http
        .post(api[USER_LOGIN_WID], payload)
        .then(rst => {
          if (rst.success) {
            commit('SET_USER_INFO', rst.user)
            commit('SET_TOKEN', rst.token)
            dispatch('getAppConfig')
            commit('updateEnterType', 'byLogin')
            resolve(rst)
          } else {
            reject(rst.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  doLogout({ commit }, payload) {
    return new Promise((resolve, reject) => {
      http
        .get(api[USER_LOGOUT], JSON.stringify(payload), { timeout: 6000 })
        .then(rst => {
          if (rst.success) {
            commit('SET_USER_INFO', {})
            commit('SET_TOKEN', '')
            commit('updateEnterType', 'byLogin')
            resolve(rst)
          } else {
            reject(rst.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  clearUserInfo({ commit }, cb) {
    commit('SET_USER_INFO', {})
    commit('SET_TOKEN', '')
    commit('updateEnterType', 'byLogin')
    cb && cb()
  },
  updateRemember({ commit }, payload) {
    commit('SET_REMEMBER_INFO', payload)
  },
  getAppConfig({ state, commit }, params) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.get(api[GET_APP_CONFIG], params)
        .then(rst => {
          if (rst.success) {
            resolve(rst)
            commit('setConf', rst.data)
          } else {
            reject(rst.msg)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

// 根据commit更新store
const mutations = {
  updateEnterType(state, type) {
    state.enterType = type
  },
  SET_USER_INFO(state, info) {
    state.userInfo = info
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_REMEMBER_INFO(state, info) {
    state.rememberInfo = info
  },
  setConf(state, conf) {
    state.config = conf
  },
  updatePermission(state, permission) {
    state.permission = permission
  },
}

const getters = {
  lastUserInfo(state) {
    return state.rememberInfo
  },
  userToken(state) {
    return state.token
  },
  userInfo(state) {
    return state.userInfo
  },
  conf(state) {
    return state.config
  },
  enterType(state) {
    return state.enterType
  },
  permissions(state) {
    return state.permission
  },
}

// 导出vuex模块
export default {
  // 模块开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
