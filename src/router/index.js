import Vue from 'vue'
import Router from 'vue-router'

import tableMake from '@/views/tableMake.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: tableMake
    },
    {
      path: '/table/:tableId',
      name: 'table',
      component: () => import('@/views/use.vue')
    },
    {
      path: '/filter',
      component: () => import('@/views/study/filter.vue')
    },
    {
      path: '/jsx',
      component: () => import('@/views/study/jsx/index.vue')
    }
  ]
})