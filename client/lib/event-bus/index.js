const style = {
  bold: ['\x1B[1m', '\x1B[22m'],
  italic: ['\x1B[3m', '\x1B[23m'],
  underline: ['\x1B[4m', '\x1B[24m'],
  inverse: ['\x1B[7m', '\x1B[27m'],
  strikethrough: ['\x1B[9m', '\x1B[29m'],
  white: ['\x1B[37m', '\x1B[39m'],
  grey: ['\x1B[90m', '\x1B[39m'],
  black: ['\x1B[30m', '\x1B[39m'],
  blue: ['\x1B[34m', '\x1B[39m'],
  cyan: ['\x1B[36m', '\x1B[39m'],
  green: ['\x1B[32m', '\x1B[39m'],
  magenta: ['\x1B[35m', '\x1B[39m'],
  red: ['\x1B[31m', '\x1B[39m'],
  yellow: ['\x1B[33m', '\x1B[39m'],
  whiteBG: ['\x1B[47m', '\x1B[49m'],
  greyBG: ['\x1B[49;5;8m', '\x1B[49m'],
  blackBG: ['\x1B[40m', '\x1B[49m'],
  blueBG: ['\x1B[44m', '\x1B[49m'],
  cyanBG: ['\x1B[46m', '\x1B[49m'],
  greenBG: ['\x1B[42m', '\x1B[49m'],
  magentaBG: ['\x1B[45m', '\x1B[49m'],
  redBG: ['\x1B[41m', '\x1B[49m'],
  yellowBG: ['\x1B[43m', '\x1B[49m'],
}

class EventBus {
  constructor() {
    this._events = {}
  }

  emit(type, ...args) {
    if (this._events[type]) {
      this._events[type].forEach(fn => fn.call(this, ...args))
    }
  }

  on(type, callback) {
    if (!this._events[type]) { // 不存在该type的回调队列
      this._events[type] = [callback]
    } else {
      this._events[type].push(callback)
    }
  }

  once(type, callback) {
    const wrap = (...args) => {
      callback(...args)
      this.rm(type, wrap)
    }
    wrap.realCallback = callback
    if (!this._events[type]) { // 不存在该type的回调队列
      this._events[type] = [wrap]
    } else {
      this._events[type].push(wrap)
    }
  }

  rm(type, callback) {
    if (this._events[type]) {
      // 过滤掉当前传入的要移除的 callback
      this._events[type] = this._events[type].filter(fn => {
        return fn !== callback && fn !== callback.realCallback
      })
    }
  }

  rmAll(type) {
    if (type) {
      this._events[type] = []
    } else {
      this._events = Object.create(null)
    }
  }


  log(title, info) {
    const label = this.decorate('white/bold/cyanBG', `[${title}]`)
    console.log(label, info)
  }

  decorate(de, msg) {
    const decorate = de.split('/')
    return decorate.reduce((v, d) => style[d].join(v), msg)
  }
}


export default EventBus