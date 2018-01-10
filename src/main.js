import Vue from 'vue'
import App from './App'
import Promise from 'es6-promise/auto';
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
Vue.config.productionTip = false

Vue.use(Vue2TouchEvents)

if (window.h2c3()) {
  /* eslint-disable no-new */
  new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      store
  })
}

