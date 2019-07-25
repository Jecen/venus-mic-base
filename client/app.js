import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'
import App from './components/App/index.vue'
import components from './components'

import 'root/assets/css/reset-1.3.3.css'

Vue.use(components)
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App,
})

const { http } = app

//TODO
// 1. 全局错误捕获

export {
  app,
  router,
  store,
  http,
}
