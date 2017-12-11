import Vue from 'vue'
import App from './App'
import Promise from 'es6-promise/auto';
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    store
})
