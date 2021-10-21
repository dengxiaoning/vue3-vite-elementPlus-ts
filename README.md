## 数据管理平台(skeletal-sys)

## 简介

数据管理平台：集成数据管理，文档管理，项目管理等功能模块
涉及模块，菜单，操作功能权限管理分配等功能模块，目前该系统
为初版骨架型，未涉及太多其它功能模块，只有搭建了一个大的
骨架，其它功能模块需要自行添加完善,自由发挥

## 目录结构

```md
|-- public # 静态资源
| |-- config.js # 配置文件
| |-- favicon.ico # favicon 图标
|-- src # 源代码
| |-- api # api 请求
| |-- assets # 主题 变量等资源
| | |-- scss # scss 变量
| | |-- theme # elemet 主题
| |-- components # 全局公共组件
| |-- hooks # 全局 hooks
| |-- config # 全局公共配置
| |-- layout # 全局 layout
| |-- locale # 国际化
| |-- plugin # 三方插件
| |-- router # 全局路由
| |-- store # 全局 vuex
| |-- utils # 全局公用方法
| |-- views # 所有页面
| |-- App.tsx # 入口页面
| |-- main.ts # 入口文件
| |-- shims-vue.d.ts # ts 声明文件
|-- static # 静态资源
| |-- img # img
| |-- svg # svg
|-- .editorconfig # editorconfig
|-- .env.development # 环境变量 开发
|-- .env.production # 环境变量 生产
|-- .eslintignore # eslintignore
|-- .eslintrc.js # eslint 配置项
|-- .gitignore # gitignore
|-- .babelrc # babel 配置项
|-- index.html # html 模板
|-- package.json # package.json
|-- README.md # README
|-- tsconfig.json # tsconfig
|-- vite.config.ts # vite 配置文件
```

##

## 项目演示

![image-20210621164021729](src\assets\imges\example\example202110172310.png)

## 项目设置

```
yarn  or  npm install
```

### 编译开发环境

```
yarn dev  or  npm run dev
```

### 编译正式环境

```
yarn build or npm run build
```

## 使用指南

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE
