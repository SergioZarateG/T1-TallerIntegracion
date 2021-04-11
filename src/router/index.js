import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/BreakingBad.vue')
  },
  {
    path: '/episodes/:id',
    name: 'Episodes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Episodes.vue')
  },
  {
    path: '/season/:id/:name',
    name: 'Season_series',
    component: () => import(/* webpackChunkName: "about" */ '../views/SeasonSeries.vue')
  },
  {
    path: '/characters/:name',
    name: 'Characters',
    component: () => import(/* webpackChunkName: "characters" */ '../views/Characters.vue')
  },
  {
    path: '/resultsearch',
    name: 'ResultSearch',
    component: () => import(/* webpackChunkName: "characters" */ '../views/Searchview.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
})

export default router
