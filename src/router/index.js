import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/views/Landing'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing,
        },
    ]
})

export default router;
