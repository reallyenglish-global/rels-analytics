import {
  NETWORK_MONITOR_ANOMALY,
  EVENT,
  NETWORK_METRICS,
  ANOMALY,
  handlerFor,
} from '../../../../constants'

export const onNetworkMonitorAnomaly = handlerFor(NETWORK_MONITOR_ANOMALY)

// Records a predicted network anomaly
const NetworkMonitorAnomaly = {
  hitType: EVENT,

  observe: NETWORK_MONITOR_ANOMALY,

  [onNetworkMonitorAnomaly]() {
    this.send(...arguments)
  },

  configure(anomaly) {
    return {
      eventCategory: NETWORK_METRICS,
      eventAction: ANOMALY,
      eventLabel: anomaly.url,
      eventValue: anomaly.last,
    }
  },
}

export { NetworkMonitorAnomaly }
