import '@babel/polyfill'
import './normalize'
import { app } from './app'

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}
// debugger // eslint-disable-line
app.$mount('#app')
