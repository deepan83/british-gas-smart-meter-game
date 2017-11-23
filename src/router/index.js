import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/views/Landing'
import Onboarding from '@/components/views/Onboarding'
import Game from '@/components/views/Game'
import Video from '@/components/views/Video'
import Score from '@/components/views/Score'

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
      path: '/game/:level',
      name: 'game',
      component: Game,
      props: true,
    },
    {
      path: '/video/:level',
      name: 'video',
      component: Video,
      props: true,
    },
    {
      path: '/score/:level',
      name: 'score',
      component: Score,
      props: true,
    },
  ]
})

export default router;
