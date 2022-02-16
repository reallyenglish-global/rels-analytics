import { Observable } from '../../../mixins'

class Hit {
  constructor(options = {}) {
    this.hitType = 'pageview'
    Observable.call(this)
    Object.assign(this, options)
  }

  payload(...args) {
    return {
      hitType: this.hitType,
      ...this.configure(...args),
    }
  }

  send(...args) {
    const payload = this.payload(...args)
    this.notifyObservers('onSend', payload)
  }
}

export { Hit }
