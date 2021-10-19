import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

import { configSvgIconsPlugin } from './src/plugins/configSvgIconsPlugin'
import { configMockPlugin } from './src/plugins/configMockPlugin'
import { configStyleImportPlugin } from './src/plugins/configStyleImportPlugin'
import { configHtmlPlugin } from './src/plugins/configHtmlPlugin'
import { configCompressPlugin } from './src/plugins/configCompressPlugin'

import { wrapperEnv } from './src/utils/env'
const resolve = (dir: string) => path.join(__dirname, dir)

// 根据环境变量配置代理 https://blog.csdn.net/chendf__/article/details/115676683
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const isBuild = command === 'build'

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  
  const {
    VITE_PORT,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_GLOB_API_URL,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  return defineConfig({
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      configSvgIconsPlugin(isBuild), // svg 处理
      configStyleImportPlugin(isBuild), // element-plus 按需引入
      configHtmlPlugin(viteEnv, isBuild), //  EJS 标签处理
      configMockPlugin(VITE_USE_MOCK, isBuild), // mock 模拟请求
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      ) // gzip 或者 brotli 来压缩资源
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
        comps: resolve('src/components'),
        apis: resolve('src/apis'),
        views: resolve('src/views'),
        store: resolve('src/store'),
        router: resolve('src/router'),
        styles: resolve('src/styles'),
        hooks: resolve('src/hooks'),
      }
    },
    optimizeDeps: {
      include: ["element-plus/lib/locale/lang/zh-cn"]
    },
    server: {
      //服务器主机名
      host: '',
      //端口号
      port: VITE_PORT,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: false,
      //自定义代理规则
      // proxy: {
      //   // 选项写法
      //   '/api': {
      //     target: 'http://test.zt.guangquzhihe.com/',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    // server: {
    //   host: 'localhost',
    //   port: VITE_PORT,
    //   https: false,
    //   proxy: {
    //       '^/(masterdataDomain|taskDomain|userDomain|pim/admin|oms/admin)': {
    //           target: 'http://dev.backendapi.aid.connext.net.cn/' // 开发
    //         // target: 'http://test.backendapi.aid.connext.net.cn/' // 测试
    //         }
    //     }
    // },
    // build:{
    //   rollupOptions:{
    //     // input: 'app.js',
    //     // external: ['elementPlus'],
    //     // output: {
    //     //   globals: {
    //     //     'elementPlus': 'https://unpkg.com/element-plus@1.0.2-beta.44/lib/index.js'
    //     //   }
    //     // }
    //     output: {
    //       assetFileNames: 'css/[name].[hash].css',
    //       chunkFileNames: 'js/[name].[hash].js',
    //       entryFileNames: 'js/[name].[hash].js',
    //       manualChunks(id) {
    //         //打包chunk命名和代码分割
    //         const chunkMap = new Map();
    //         chunkMap.set(/[\\/]src[\\/]layout[\\/]/.test(id), 'basicLayout');
    //         chunkMap.set(/[\\/]src[\\/]components[\\/]/.test(id), 'basicComponent');
    //         chunkMap.set(/[\\/]node_modules[\\/]/.test(id), 'vendors');
    //         chunkMap.set(/[\\/]node_modules[\\/]echarts[\\/]/.test(id), 'echarts');
    //         chunkMap.set(/[\\/]node_modules[\\/]lodash[\\/]/.test(id), 'lodash');
    //         chunkMap.set(/[\\/]node_modules[\\/]moment[\\/]/.test(id), 'moment');
    //         chunkMap.set(/[\\/]node_modules[\\/]xlsx[\\/]xlsx.js/.test(id), 'xlsxIndex');
    //         chunkMap.set(/[\\/]node_modules[\\/]xlsx[\\/](?!(xlsx.js))/.test(id), 'xlsx');
    //         chunkMap.set(/[\\/]node_modules[\\/]element-plus[\\/]/.test(id), 'element');
    //         if(chunkMap.get(true)) return chunkMap.get(true);
    //       }
    //     },
        

    //   },
    // }
  })
}
