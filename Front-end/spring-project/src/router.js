import Vue from 'vue'
import Router from 'vue-router'


import Welcome from './page/welcome.vue'
import sysIndex from "./page/sysIndex.vue"
import ERROR from './page/404_ERROR.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
        path:'/',
        name: 'welcome',
        component:Welcome
    },{
      path:'/sysIndex',
      name:"sysindex",
      component:sysIndex
    },{
      path:'*',
      name:"404 ERROR",
      component:ERROR
    }
  ]
})
