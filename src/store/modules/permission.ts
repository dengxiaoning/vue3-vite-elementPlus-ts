import {
  constantRoutes
} from '@/router/index'
import { Module } from 'vuex';
import { permissionListState, RootStateTypes } from 'store/interface/index';

const permissionModule : Module<permissionListState, RootStateTypes>= {
  state: {
    routeList: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state:any, routes:any) => {
      state.addRoutes = routes
      let resRoutelist:any[] = constantRoutes.map(e => e.name !== 'root')
      let getRootList = constantRoutes.find(e => e.name === 'root');
      if (getRootList) {
        resRoutelist= resRoutelist.concat(getRootList.children)
      }
      
      state.routeList = resRoutelist.concat(routes)
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({
      commit
    }:any) {
      return new Promise((resolve:any) => {
        var testData = {
          "msg": "操作成功",
          "code": 200,
          "data": [
            {
              "name": "system",
              "path": "/system",
              "component": "Layout",
              "meta": {
                "auth": ['admin', 'test'],
                "title": "文档管理",
                icon: 'iconfont el-icon-menu',
                isAffix: false,
                isHide: false,
                isKeepAlive: true,
              },
              "children": [{
                "name": "user",
                "path": "user",
                "component": "system/user/index",
                "meta": {
                  "auth": ['admin', 'test'],
                  "title": "基础信息管理",
                  icon: 'iconfont el-icon-menu',
                  isAffix: false,
                  isHide: false,
                  isKeepAlive: true,
                }
              }]
            }
          ]
        
        }
        // const accessedRoutes = filterAsyncRouter(testData.data)
        const accessedRoutes = testData.data
        // accessedRoutes.push({
        //   path: '/:catchAll(.*)',
        //   redirect: '/404',
        //   hidden: true
        // })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)

        // 向后端请求路由数据
        // getRouters().then(res => {
        //   const accessedRoutes = filterAsyncRouter(res.data)
        //   accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        //   commit('SET_ROUTES', accessedRoutes)
        //   resolve(accessedRoutes)
        // })
      })
    }
  }
}


export default permissionModule
