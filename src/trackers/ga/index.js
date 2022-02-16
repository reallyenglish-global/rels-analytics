import { RELAY } from '../../constants'
import { Hit } from './hit'
import { Observable } from '../../mixins'
import * as hits from './hits'

const GA = {
  activate(options = {}) {
    this.options = { ...options }
    // Need this on window as it is
    // used by the analytics.js file
    // we inject.
    window.ga = () => {
      this.ga.q = []
      this.ga.q.push(arguments)
    }

    window.ga.l = new Date()

    const success = this.afterActivate.bind(this)

    const error = () => {
      console.log('Google analytics could not be activated') /* eslint-disable-line no-console */
    }

    const { resource, init } = this.analytics
    return window.fetch(resource, init).then(success, error)
  },

  relay: RELAY,

  deactivate() {
    this.removeObservers()
  },

  onSend(fields) {
    this.ga('send', fields)
  },

  afterActivate() {
    const { propertyId } = this.options
    this.ga = window.ga
    delete window.ga

    this.ga('create', propertyId, 'auto')

    Object.values(hits).forEach((hit) => {
      const { observe, ...options } = hit
      new Hit(options).observe(this, observe).addObserver(this, 'send')
    })

    return this
  },

  analytics: {
    resource: 'https://www.google-analytics.com/analytics.js',
    init: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript',
      },
      mode: 'no-cors',
    },
  },
}

Observable.call(GA)

export { GA }
