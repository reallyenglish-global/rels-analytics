import { RELAY } from '../../constants'
import { Hit } from './hit'
import { Observable } from '../../mixins'
import * as hits from './hits'

const GA4 = {
  activate(options = {}) {
    this.options = { ...options }

    const { measurementId } = this.options
    if (!measurementId) {
      console.error('GA4: no measurementId provided')
      return Promise.resolve(false)
    }

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line
    window.gtag('js', new Date())
    window.gtag('config', measurementId)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    Object.values(hits).forEach((hit) => {
      const { observe, ...config } = hit
      new Hit(config).observe(this, observe).addObserver(this, 'send')
    })

    return Promise.resolve(this)
  },

  relay: RELAY,

  deactivate() {
    this.removeObservers()
  },

  onSend(fields) {
    if (!window.gtag) return

    const { hitType, ...params } = fields

    switch (hitType) {
      case 'pageview': {
        window.gtag('event', 'page_view', {
          page_title: params.page,
        })
        break
      }
      case 'event': {
        window.gtag('event', params.eventAction || 'custom_event', {
          event_category: params.eventCategory,
          event_label: params.eventLabel,
          value: params.eventValue,
        })
        break
      }
      case 'timing': {
        window.gtag('event', 'timing_complete', {
          name: params.timingVar,
          value: params.timingValue,
          event_category: params.timingCategory,
          event_label: params.timingLabel,
        })
        break
      }
      default: {
        window.gtag('event', hitType, params)
      }
    }
  },
}

Observable.call(GA4)

export { GA4 }
