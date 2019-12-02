import { pageForLesson } from '../../../helpers'
import Observable from '../../../mixins/Observable'

export default class Hit {
  constructor(options = {}) {
    this.hitType = 'pageview'
    this.pageForLesson = pageForLesson
    Observable.call(this)
    Object.assign(this, options)
  }

  payload() {
    return {
      hitType: this.hitType,
      ...this.configure(...arguments),
    }
  }

  send() {
    const payload = this.payload(...arguments)
    this.notifyObservers('onSend', payload)
  }
}
