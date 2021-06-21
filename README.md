

<p align="center">
    <a href="https://npmjs.com/package/node"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatility"></a>
    <a href="https://npmjs.com/package/npm"><img src="https://img.shields.io/badge/npm-v6.13.4-blue" alt="npm package"></a>
    <a href="https://npmjs.com/package/vue"><img src="https://img.shields.io/badge/vue-v3.0.5-success" alt="vue package"></a>
    <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/badge/vite-v2.2.1-blue" alt="vite package"></a>
    <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer"></a>
</p>



## 简介
>使用最新的`vue3`,`vite2`,`typescript`等主流技术搭建的一个供学习参考的模版工程。

## 包含
- **技术栈**：使用 `vue3`,`vite`,`typescript`等前沿技术开发
- **ajax**：二次封装`axios`，统一管理接口  [axios中文文档 (javasoho.com)](https://javasoho.com/axios/index.html)
- **UI 框架**：`element-plus`主题样式   [Element Plus - The world's most popular Vue 3 UI framework (gitee.io)](https://element-plus.gitee.io/#/zh-CN/component/installation)
- **工具**：lodash ([Lodash 简介 | Lodash 中文文档 | Lodash 中文网 (lodashjs.com)](https://www.lodashjs.com/)) 常用的指令，过滤器，`storage`存储，工具函数   

## 目录结构
```md
|-- public                          # 静态资源
|   |-- config.js                   # 配置文件
|   |-- favicon.ico                 # favicon图标
|-- src                             # 源代码
|   |-- api                         # api请求
|   |-- assets                      # 主题 变量等资源
|   |   |-- scss                    # scss变量
|   |   |-- theme                   # elemet主题
|   |-- components                  # 全局公共组件
|   |-- hooks                       # 全局hooks
|   |-- config                      # 全局公共配置
|   |-- layout                      # 全局layout
|   |-- locale                      # 国际化
|   |-- plugin                      # 三方插件
|   |-- router                      # 全局路由
|   |-- store                       # 全局vuex
|   |-- utils                       # 全局公用方法
|   |-- views                       # 所有页面
|   |-- App.vue                     # 入口页面
|   |-- main.ts                     # 入口文件
|   |-- shims-vue.d.ts              # ts声明文件
|-- static                          # 静态资源
|   |-- img                         # img
|   |-- svg                         # svg
|-- .editorconfig                   # editorconfig
|-- .env.development                # 环境变量 开发
|-- .env.production                 # 环境变量 生产
|-- .eslintignore                   # eslintignore
|-- .eslintrc.js                    # eslint 配置项
|-- .gitignore                      # gitignore
|-- babel.config.js                 # babel 配置项
|-- index.html                      # html模板
|-- package.json                    # package.json
|-- README.md                       # README
|-- tsconfig.json                   # tsconfig
|-- vite.config.ts                  # vite 配置文件
```

## 

## 项目演示

![image-20210621163806730](src\assets\imges\image-20210621163806730.png)

![image-20210621164021729](src\assets\imges\image-20210621164021729.png)



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
