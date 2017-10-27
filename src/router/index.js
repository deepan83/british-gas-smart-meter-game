import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/views/Hello'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello,
        },
    ]
})

export default router;
