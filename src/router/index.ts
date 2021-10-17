import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

const Layout = () => import('@/layout/index.vue')

export const constantRoutes = [
  {
    path: '/',
    name:'root',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name:'home',
        component: ()=>import('views/home/index.vue'),
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-menu',
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: '首页',
          index: '1'
        },
      },
      {
        path: '/demo',
        name:'demo',
        component: () => import('views/system/user/index.vue'),
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-s-grid',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: 'demo',
          index: '2'
        },
      },
      {
        path: '/icon',
        name:'icon',
        component: () => import('views/icon/index.vue'),
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-s-grid',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: 'icon',
          index: '3'
        },
      },
      {
        path: '/elementIcon',
        name:'elementIcon',
        component: () => import('views/elementIcon/index.vue'),
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-s-grid',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: 'elementIcon',
          index: '4'
        },
      }
      
    ]
  },
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = createRouter({
  history: routerHistory,
  routes: constantRoutes
})

// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>): void {
  app.use(router)
}
export default router
