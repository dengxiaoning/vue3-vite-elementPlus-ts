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

router.beforeEach((to:any, from:any, next:any) => {
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
      store.dispatch('GetInfo').then((res:any) => {
          // 拉取user_info
          const roles = res.roles
          store.dispatch('GenerateRoutes', {
            roles
          }).then((accessRoutes: AppRouteRecordRaw[]) => {
            const obtainModules = getMoulesByRoute();
            // 根据roles权限生成可访问的路由表
            custAddRoutes(accessRoutes,'',obtainModules)
            // verifyUserRouteList(accessRoutes);
            loading.close(); // 关闭loading
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成
          })
        })
        .catch((err:any) => {
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
const custAddRoutes = (routes:AppRouteRecordRaw[], parentName:string = " ",obtainModules:Function) :void => {
  routes.forEach((item:any) => {
    if (item.path && item.component) {
      const componentString = item.component.replace(/^\/+/, ""), // 过滤字符串前面所有 '/' 字符
        componentPath = componentString.replace(/\.\w+$/, ""); // 过滤掉后缀名，为了让 import 加入 .vue ，不然会有警告提示...

     
      const eachRoute = {
        path: item.path,
        redirect: item.redirect,
        name: item.name, 
        // component: item.component === 'Layout' ? Layout : () => import(`./views/${componentPath}.vue`) ,
        component: item.component === 'Layout' ? Layout : obtainModules(`./views/${componentPath}.vue`) ,
        meta: item.meta 
      }

      parentName ? router.addRoute(parentName, eachRoute) : router.addRoute(eachRoute);

      if (item.children && item.children.length) {
        custAddRoutes(item.children, item.name,obtainModules);
      }
    }
  })

};

/**
 * 根据component 获取真实的模块
 * @returns 
 */
function getMoulesByRoute():Function {
  // 把所有的数据读出来
  const modulesGlob = import.meta.globEager("./views/**/**.vue");
  return (componentStr: string):any => {
    let finalComp = null;
    Object.keys(modulesGlob).map((key) => {
      if (key === componentStr) {
        finalComp =modulesGlob[key].default;
        
      }
    });
    return finalComp;
  }
}

/**
 * 使用glob加载views下的所有vue文件
 * 根据list对比用户是否拥有该页面权限
 * 获取到对应fileurl和list 中对应的component 进行对比，如果相等就证明这是要找的路由文件
 * @param list 
 */
function verifyUserRouteList(list: AppRouteRecordRaw[]) {
  debugger;
  const modules = import.meta.globEager("./views/**/**.vue");
  for (const path in modules) {
    console.log(path)
    // modules[path]().then((mod) => {
    //   const file = mod.default;
    //   // 拿到对应的module 路径，取views后面的路径，去ruleRoleList中找寻对应的路径
    //   const _file = file.__file;
    //   console.log('_file is :', _file);
    //   // if (list.map((a) => a.name).includes(file.name)) {
    //   //   router.addRoute({
    //   //     path: "/" + file.name,
    //   //     name: file.name,
    //   //     component: file,
    //   //   });
    //   // }
    // });
  }
}

router.afterEach(() => {
  NProgress.done()
})