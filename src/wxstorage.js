import Core from './core'
import { isArray, isObject } from './Type.js'

class WXS extends Core {
  get data () {
    return wx
  }
  setItem (k, v, config) {
    try {
      if (isArray(v) || isObject(v)) {
        this.data.setStorageSync({
          key: k,
          data: JSON.stringify(v)
        })
      } else {
        this.data.setStorageSync({
          key: k,
          data: v
        })
      }
      !!config && this.setConfig(k, config)
    } catch (e) {
      switch (e.name) {
        case 'QuotaExceededError':
          console.error('内存溢出')
          break
        default:
          break
      }
    }
  }
  hasItem (k) {
    return !!this.getStorageSync(k)
  }
  getItem (k) {
    const opt = this.getConfig(k)
    if (opt) {
      if (opt.expires) {
        if (new Date().getTime() > new Date(opt.expires).getTime()) {
          this.data.setStorageSync({
            key: k,
            data: ''
          })
          this.clearConfig(k)
          return undefined
        }
      }
    }
    const v = this.data.getStorageSync(k)
    return v ? JSON.parse(v) : undefined
  }
  removeItem (k, config = {}) {
    if (!k || !this.hasItem(k)) return
    this.data.setStorageSync({
      key: k,
      data: ''
    })
  }
  clear () {
    this.data.clearStorageSync()
  }
  /**
   * [setConfig 配置存储修改]
   */
  setConfig (k, opt) {
    const v = this.getConfig(k) || {
      ...opt
    }
    const config = this.getConfig() || {}
    config[k] = v
    this.data.setStorageSync({
      key: this.config.configName,
      data: JSON.stringify(config)
    })
  }
  clearConfig (k) {
    const config = this.getConfig() || {}
    config[k] = undefined
    this.data.setStorageSync({
      key: this.config.configName,
      data: JSON.stringify(config)
    })
  }
  /**
   * [getConfig 配置存储修改]
   */
  getConfig (k) {
    const configStr = this.data.getItem(this.config.configName)
    const config = configStr ? JSON.parse(configStr) : {}
    return k ? (config[k] || undefined) : config
  }
}

export default WXS
