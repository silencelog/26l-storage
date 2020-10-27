import Core from './core'
import LocalStorage from './localstorage'
import SessionStorage from './sessionstorage'
import WXStorage from './wxstorage'

Core.use('localstorage', LocalStorage)
Core.use('sessionStorage', SessionStorage)
Core.use('wxstorage', WXStorage)

window && (window.LouoStorage = Core)

export default Core
