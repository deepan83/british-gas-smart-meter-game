import Vue from 'vue'
import App from './App'
import Promise from 'es6-promise/auto';
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
import VueYoutube from 'vue-youtube'
import browserDetect from './util/browserDetect'
Vue.config.productionTip = false

Vue.use(VueYoutube)
Vue.use(Vue2TouchEvents)

var browser = browserDetect();

var nonsupportedBrowser = browser.name == 'Microsoft Internet Explorer' && browser.majorVersion <= 10;

if (nonsupportedBrowser) {
  var element = document.getElementById('nonsupported');
  element.style.display = 'block';
}

if (window.h2c3() && !nonsupportedBrowser) {
  /* eslint-disable no-new */
  new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      store
  })
}

