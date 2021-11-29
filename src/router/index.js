import { createRouter, createWebHistory } from 'vue-router'

import Search from '../pages/Search.vue'
import About from '../pages/About.vue'

const routes = [
  {path: '/', redirect: '/ScenicSpot'},
  {path: '/ScenicSpot', name:'ScenicSpot', component: Search},
  {path: '/ScenicSpot/:query', component: About},
  {path: '/Restaurant', name:'Restaurant', component: Search},
  {path: '/Restaurant/:query', component: About},
  {path: '/Hotel', name:'Hotel', component: Search},
  {path: '/Hotel/:query', component: About},
  {path: '/Activity', name:'Activity', component: Search},
  {path: '/Activity/:query', component: About},
]

const router = createRouter( {
  history: createWebHistory(),
  routes
})

export default router