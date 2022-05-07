import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/user/indexView.vue'
import myView from '../views/home/indexView.vue'
import MallView from '@/views/mall/indexView.vue'
import Page1 from '@/views/other/pagenView.vue'
import Page2 from '@/views/other/pagetView.vue'
import registerView from '@/views/register/registerView.vue'
import loginView from '@/views/login/loginView.vue'
import pathArr from '@/router/pathArr.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/register',
    name: 'Register',
    component: registerView
  },
  {
    path: '/login',
    name: 'Login',
    component: loginView
  },
  {
    path: '/main',
    redirect: '/home',
    name: 'Main',
    component: HomeView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: myView
      },
      {
        path: '/user',
        name: 'user',
        component: UserView
      },
      {
        path: '/mall',
        name: 'mall',
        component: MallView
      },
      {
        path: '/page1',
        name: 'page1',
        component: Page1
      },
      {
        path: '/page2',
        name: 'page2',
        component: Page2
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
