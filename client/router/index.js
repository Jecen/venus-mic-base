import Vue from 'vue'
import Router from 'vue-router'
import Login  from '../views/login'
import RouterWrapper  from '../views/router-wrapper'
import ErrorPage  from '../components/ErrorPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    component: Login,
  }, {
    path: '/error/:code',
    component: ErrorPage,
  }, {
    path: '*',
    component: RouterWrapper,
  }],
})