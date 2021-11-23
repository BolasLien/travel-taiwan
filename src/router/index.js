import { createRouter, createWebHistory } from 'vue-router'

import Search from '../pages/Search.vue'
import About from '../pages/About.vue'

const routes = [
  {path: '/', name:'Search', component: Search},
  {path: '/:type/:query', name:'About', component: About},
]

const router = createRouter( {
  history: createWebHistory(),
  routes
})

export default router