import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/player/:type/:playType/:channel/:id',
    name: 'Player',
    component: () => import('@views/Player.vue')
  },
  {
    path: '/details/:type/:playType/:channel/:id',
    name: 'Details',
    component: () => import('@views/Details.vue')
  },
  {
    path: '/test',
    component: () => import('@comp/Live/LivePlayer.vue')
  },
  {
    path: '/:type',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
