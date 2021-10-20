
// import type { App } from 'vue'

// export function setupGlobalCom(app:App<Element>) {
//   // Dynamic injection modules
//   const modulesGlob = import.meta.globEager('./*/index.*');
//   Object.keys(modulesGlob).map((key) => {
//     // 使用文件夹名称作为comp key
//     const compKey = key.split('/')[1];
//     app.component(compKey, modulesGlob[key].default);
// });

// }

import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import Iconify from './CIcon/index.vue'


export function setupGlobalCom(app:App<Element>) {

  app.component('SvgIcon', SvgIcon)
  app.component('CIcon', Iconify)

}