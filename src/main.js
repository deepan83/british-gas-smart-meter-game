import Vue from 'vue'
import App from './App'
import router from './router'
import Promise from 'es6-promise/auto';
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store
})
