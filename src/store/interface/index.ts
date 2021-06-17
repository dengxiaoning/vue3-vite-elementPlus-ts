import { defineComponent } from 'vue'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

interface RouteMeta {
  auth: string[]
  icon: string
  isLink?: string
  isAffix: boolean
  isHide: boolean
  isKeepAlive: boolean
  title: string
  index: string | number
  roles?: string[]
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  query?: Partial<Recordable>  | undefined
}

export interface Menu {
  name: string

  path: string

  orderNo?: number

  query?:  Partial<Recordable>  | undefined

  meta: Partial<RouteMeta>

  children?: Menu[]
}

// 布局配置
export interface ThemeConfigState {
  isCollapse: boolean
  isBreadcrumb: boolean
  isFixedHeader: boolean
  isShowLogo: boolean
  isBreadcrumbIcon: boolean
  isShowLogoChange: boolean
  isCacheTagsView: boolean
  isUniqueOpened: boolean
  isTagsviewIcon: false
  globalTitle: string
  animation: string
  layout: string
  menuBar: string
}

export interface App {
  count: number
}

export interface RoutesListState {
  routesList: Array<AppRouteRecordRaw>
}

export interface TagsViewRoutesState {
  tagsViewRoutes: Array<Menu>
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  themeConfig: ThemeConfigState
  app: App
  routesList: RoutesListState
  tagsViewRoutes: TagsViewRoutesState
}

export type AppRouteModule = AppRouteRecordRaw
