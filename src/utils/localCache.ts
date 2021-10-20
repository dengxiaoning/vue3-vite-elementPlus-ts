import {parse as jsonparse, stringify as jsonstringify} from 'flatted';
// 设置永久缓存
export function setLocal(key: string, val: any) {
  if (val) {
    window.localStorage.setItem(key, jsonstringify(val))
  }

}

// 获取永久缓存
export function getLocal(key: string) {
  let json: any = window.localStorage.getItem(key)
  return json ? jsonparse(json) : null;
}

// 2. sessionStorage
// 设置临时缓存
export function setSession(key: string, val: any) {
  if (val) {
    window.sessionStorage.setItem(key,jsonstringify(val));
  }

}
// 获取临时缓存
export function getSession(key: string) {
	let json: any = window.sessionStorage.getItem(key);
	return json?jsonparse(json):null;
}
// 移除临时缓存
export function removeSession(key: string) {
	window.sessionStorage.removeItem(key);
}
// 移除全部临时缓存
export function clearSession() {
	window.sessionStorage.clear();
}
