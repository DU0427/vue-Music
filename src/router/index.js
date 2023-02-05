import Vue from 'vue'
import VueRouter from 'vue-router'
import Song from '../views/Song.vue'
import Home from '../views/Home.vue'
import Chart from '../views/Chart.vue'

const origin = VueRouter.prototype.push

VueRouter.prototype.push = function push(location){
  return origin.call(this,location).catch(err =>err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path:'/Song',
    name:'Song',
    component:Song,
  },
  {
    path: '/MyMv',
    name: 'MyMv',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyMv.vue')
  },
  {
    path:'/Chart',
    name:'Chart',
    component:Chart,
  }
]

const router = new VueRouter({
  routes
})

export default router
