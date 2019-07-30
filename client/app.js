import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import EventBus from './lib/event-bus'
import router from './router'
import store from './store'
import App from './components/App/index.vue'
import components from './components'

import 'root/assets/css/reset-1.3.3.css'

Vue.use(components)
sync(store, router)

const bus = new EventBus()

const app = new Vue({
  router,
  store,
  provide: { bus },
  ...App,
})

const { http } = app

console.log(router)

// permission

//TODO
// 1. 全局错误捕获

export {
  app,
  router,
  store,
  http,
}
