export class Utils {
  /**
   * 生成随机字符串
   */
  public static toAnyString() {
    const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(
      /[xy]/g,
      (c: string) => {
        const r: number = (Math.random() * 16) | 0
        const v: number = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString()
      }
    )
    return str
  }

  /**
   * 截取URL参数
   * @param {string} url
   * @returns {Object}
   */
  public static param2Obj(url: string) {
    const search: string = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
    )
  }
  
  /**
   * 防抖
   * @param {Function} func
   * @param {number} wait
   * @param {boolean} immediate
   * @return {*}
   */
  public static debounce(
    func: Function,
    wait: number,
    immediate: boolean = false
  ) {
    let timeout: any, args: any, context: any, timestamp: number, result: any

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
    return  (...args: any) => {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }
}
