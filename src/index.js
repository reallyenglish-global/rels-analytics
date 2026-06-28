import { GOOGLE_ANALYTICS_WEB, GOOGLE_ANALYTICS_4_WEB, RELAY } from './constants'
import { Observable } from './mixins'
import { GA } from './trackers/ga'
import { GA4 } from './trackers/ga4'

const RelsAnalytics = {
  activate(name, options) {
    return this.trackers[name].activate(options).then((tracker) => {
      if (!tracker) {
        console.log('Could not activate tracker', name, options)
        return false
      }
      return tracker.observe(RelsAnalytics, RELAY)
    })
  },

  trackers: {
    [GOOGLE_ANALYTICS_WEB]: GA,
    [GOOGLE_ANALYTICS_4_WEB]: GA4,
  },
}

Observable.call(RelsAnalytics)

export default RelsAnalytics

if (process.env && process.env.NODE_ENV === 'development') {
  window.RelsAnalytics = RelsAnalytics
}
