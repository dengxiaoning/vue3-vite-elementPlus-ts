
import type { App } from 'vue'

export function setupGlobalCom(app:App<Element>) {
  // Dynamic injection modules
  const modulesGlob = import.meta.globEager('./*/index.*');
  Object.keys(modulesGlob).map((key) => {
    // 使用文件夹名称作为comp key
    const compKey = key.split('/')[1];
    app.component(compKey, modulesGlob[key].default);
});

}