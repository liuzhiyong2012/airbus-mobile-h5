import CryptoJS from 'crypto-js'
// sessionStorage封装
export const sessionStore = {
  get(key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(key) as string)
    } catch (error) {
      return null
    }
  },
  set(key: string, val: any) {
    sessionStorage.setItem(key, JSON.stringify(val))
  },
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  }
}
// localStorage封装
export const localStore = {
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) as string)
    } catch (error) {
      return null
    }
  },
  set(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
// CryptoJS MD5加密封装

export const md5 = (val: string) => {
  return CryptoJS.MD5(val).toString()
}
// CryptoJS 项目通用加解密封装
export const crypto = {
  key: '',
  // 加密
  en(val: any) {
    const res = CryptoJS.AES.encrypt(val, this.key).toString()
    return res
  },
  // 解密
  de(val: any) {
    const res = CryptoJS.AES.decrypt(val, this.key).toString(CryptoJS.enc.Utf8)
    return res
  }
}
