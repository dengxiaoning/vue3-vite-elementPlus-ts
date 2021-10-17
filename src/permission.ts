import router from './router/index'
import store from './store/index'
import { AppRouteRecordRaw } from 'store/interface/index';
import Layout from '@/layout/index.vue'
import {
  ElMessage,
  ElLoading
} from 'element-plus'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  const userislogin = sessionStorage.getItem('userInfo');
  NProgress.start()
  /* has token*/

  if (!userislogin) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login') // h
    }

    NProgress.done()
  } else {

    if (store.state.user.roles.length === 0) {
      const loading = ElLoading.service();
      // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetInfo').then(res => {
          // 拉取user_info
          const roles = res.roles
          store.dispatch('GenerateRoutes', {
            roles
          }).then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            custAddRoutes(accessRoutes)
            loading.close(); // 关闭loading
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成
          })
        })
        .catch(err => {
          store.dispatch('FedLogOut').then(() => {
            ElMessage.error(err)
            next({
              path: '/'
            })
          })
        })
    } else {
      next()
    }
  }
})


/**
 * 动态添加路由
 * import() 使用动态路径
 * 只可以是相对路径
 * import(`@/${componentPath}.vue`)❌
 * import(`/${componentPath}.vue`)❌
 * import(`${componentPath}.vue`)❌ 
 * import(`./${componentPath}.vue`)❌
 * import(`./views/${componentPath}.vue`)✔
 * https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 */
const custAddRoutes = (routes:AppRouteRecordRaw[], parentName:string = " ") :void => {
  routes.forEach((item:any) => {
    if (item.path && item.component) {
      const componentString = item.component.replace(/^\/+/, ""), // 过滤字符串前面所有 '/' 字符
        componentPath = componentString.replace(/\.\w+$/, ""); // 过滤掉后缀名，为了让 import 加入 .vue ，不然会有警告提示...

     
      const eachRoute = {
        path: item.path,
        redirect: item.redirect,
        name: item.name, 
        component: item.component === 'Layout' ? Layout : () => import(`./views/${componentPath}.vue`) ,
        meta: item.meta 
      }

      parentName ? router.addRoute(parentName, eachRoute) : router.addRoute(eachRoute);

      if (item.children && item.children.length) {
        custAddRoutes(item.children, item.name);
      }
    }
  })

};


router.afterEach(() => {
  NProgress.done()
})