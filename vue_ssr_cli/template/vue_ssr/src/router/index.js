import Vue from 'vue'
import Router from 'vue-router'
import HomePages from './Home'
import Index from '@/pages/Index'
import Home from '@/pages/Home'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'hash',
    routes: [
      {
          path: '/',
          name: 'index',
          component: Index
      },
      ...HomePages
    ]
  })
}