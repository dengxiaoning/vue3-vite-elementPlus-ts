import { Module } from 'vuex';
import { RoutesListState, RootStateTypes } from 'store/interface/index';
import { AppRouteRecordRaw } from '../interface/index'
const routesListModule: Module<RoutesListState, RootStateTypes> = {
	namespaced: true,
	state: {
		routesList: [
      {
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-menu',
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: '首页',
          index: '1'
        },
        name: 'home',
        path: '/home'
      },
      {
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-s-grid',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: 'demo',
          index: '2'
        },
        name: 'demo',
        path: '/demo',
        children:[
        ],
      },
      {
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-s-grid',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: 'icon',
          index: '3'
        },
        name: 'icon',
        path: '/icon'
      },
      {
        meta: {
          auth: ['admin', 'test'],
          icon: 'iconfont el-icon-s-grid',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: 'elementIcon',
          index: '4'
        },
        name: 'elementIcon',
        path: '/elementIcon'
      },
      {
        "name": "system",
        "path": "/system",
        "component": "Layout",
        "meta": {
          "auth": ['admin', 'test'],
          "title": "水利工程基础管理",
          icon: 'iconfont el-icon-menu',
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
        },
        "children": [{
          "name": "user",
          "path": "user",
          "component": "views/system/user/index",
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
    ],
	},
	mutations: {
		// 设置路由，菜单中使用到
		getRoutesList(state: any, data: Array<AppRouteRecordRaw>) {
			state.routesList = data;
		},
	},
	actions: {
		// 设置路由，菜单中使用到
		async setRoutesList({ commit }, data:Array<AppRouteRecordRaw>) {
			commit('getRoutesList', data);
		},
	},
};

export default routesListModule;
