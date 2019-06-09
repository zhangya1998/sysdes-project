import Vue from 'vue'
import Router from 'vue-router'


import Welcome from './components/welcome.vue'
import sysIndex from "./components/sysIndex.vue"
import ERROR from './components/404_ERROR.vue'

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
