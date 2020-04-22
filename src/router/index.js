import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login.vue'
import home from '@/components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to: 将要访问的路由路径
  // from: 跳转出的路由路径
  // next: 一个函数 next()直接放行  next('/xxx')表示强制跳转至某路径
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
