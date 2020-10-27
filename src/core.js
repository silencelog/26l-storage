class LouoStorage {
  constructor (config) {
    this.config = {
      name: '',
      configName: 'LStorageConfig'
    }
    Object.assign(this.config, config)
  }
  get db () {
    let key = (this.config.name).toString().toUpperCase()
    if (!LouoStorage[key]) {
      throw new Error('db is undefined')
    }
    return LouoStorage[key]
  }
  /**
   * [switch 切换数据库类型]
   * @return {[type]} [description]
   */
  switch (name) {
    this.config.name = 'name'
  }
  /**
   * [setItem 设置值]
   * @param {String} k [键]
   * @param {*} v      [值]
   * @param {Object} config [{expires: 结束时间}]
   */
  setItem (k, v, config) {
    this.db.setItem(k, v, config)
    return this
  }
  /**
   * [hasItem 是否存在某一项]
   * @param  {[type]}  k [description]
   * @return {Boolean}   [description]
   */
  hasItem (k) {
    return this.db.hasItem(k)
  }
  /**
   * [getItem 获取某一项]
   * @param  {[type]} k [description]
   * @return {[type]}   [description]
   */
  getItem (k) {
    return this.db.getItem(k)
  }
  /**
   * [removeItem 删除某一项]
   * @param  {[type]} k      [description]
   * @param  {Object} config [description]
   * @return {[type]}        [description]
   */
  removeItem (k, config = {}) {
    if (!k || !this.hasItem(k)) return
    if (Array.isArray(k)) {
      k.forEach((i) => {
        this.db.removeItem(i, config = {})
      })
    } else {
      this.db.removeItem(k, config = {})
    }
  }
  /**
   * [keys 获取所有key值数组]
   * @return {[type]} [description]
   */
  keys () {
    this.db.keys()
  }
  /**
   * [key 根据位置获取key值]
   * @param  {[type]} i [description]
   * @return {[type]}   [description]
   */
  key (i) {
    this.db.key(i)
  }
  /**
   * [clear 数据库清空]
   * @return {[type]} [description]
   */
  clear () {
    this.db.clear()
  }
  /**
   * [getUsedSpace 获取已使用空间]
   * @return {[type]} [description]
   */
  getUsedSpace () {
    this.db.getUsedSpace()
  }
  /**
   * [getLimitSpace 获取存储上限]
   * @return {[type]} [description]
   */
  getLimitSpace () {
    this.db.getLimitSpace()
  }
}
/**
 * [dbs 挂载的数据库列表]
 * @type {Array}
 */
LouoStorage.dbs = []
/**
 * [extendDB 数据库挂载]
 * @param  {String} name [description]
 * @param  {Object} db  [description]
 * @return {Null}      [description]
 */
LouoStorage.use = function (name, DB) {
  const db = new DB()
  LouoStorage[name.toString().toUpperCase()] = db
  LouoStorage.dbs.push({
    name: name.toString().toUpperCase(),
    db: db
  })
}

export default LouoStorage
