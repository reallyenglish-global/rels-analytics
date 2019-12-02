import { GOOGLE_ANALYTICS_WEB, RELAY } from './constants'
import Observable from './mixins/Observable'
import GA from './trackers/ga'

const RelsAnalytics = {
  activate(name, options) {
    return this.trackers[name].activate(options).then((tracker) => {
      return tracker.observe(RelsAnalytics, RELAY)
    })
  },

  trackers: {
    [GOOGLE_ANALYTICS_WEB]: GA,
  },
}

Observable.call(RelsAnalytics)

export default RelsAnalytics
