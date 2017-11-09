import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/views/Landing'
import Onboarding from '@/components/views/Onboarding'
import Level from '@/components/views/Level'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      props: (route) => ({onboarding_always: route.query.onboarding_always}),
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding,
    },
    {
      path: '/level/:level',
      name: 'level',
      component: Level,
      props: true,
    },
  ]
})

export default router;
