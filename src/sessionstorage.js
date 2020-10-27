import Core from './core'
import { isArray, isObject } from './Type.js'

class SS extends Core {
  get data () {
    return window.sessionStorage
  }
  setItem (k, v, config) {
    try {
      if (isArray(v) || isObject(v)) {
        this.data.setItem(k, JSON.stringify(v))
      } else {
        this.data.setItem(k, v)
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
    return !!this.getItem(k)
  }
  getItem (k) {
    const opt = this.getConfig(k)
    if (opt) {
      if (opt.expires) {
        if (new Date().getTime() > new Date(opt.expires).getTime()) {
          this.data.removeItem(k)
          this.clearConfig(k)
          return undefined
        }
      }
    }
    const v = this.data.getItem(k)
    return v ? JSON.parse(v) : undefined
  }
  removeItem (k, config = {}) {
    if (!k || !this.hasItem(k)) return
    this.data.removeItem(k)
  }
  clear () {
    this.data.clear()
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
    this.data.setItem(this.config.configName, JSON.stringify(config))
  }
  clearConfig (k) {
    const config = this.getConfig() || {}
    config[k] = undefined
    this.data.setItem(this.config.configName, JSON.stringify(config))
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

export default SS
