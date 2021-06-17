
import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

export function setupGlobalCom(app:App<Element>) {

  app.component('SvgIcon', SvgIcon)

}
