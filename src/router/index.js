import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../views/Home2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/player/:type/:playType/:channel/:id',
    name: 'Player',
    component: () => import('@views/Player.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@views/Mine.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
