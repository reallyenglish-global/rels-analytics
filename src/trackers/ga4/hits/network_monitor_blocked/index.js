import {
  NETWORK_MONITOR_BLOCKED,
  EVENT,
  NETWORK_METRICS,
  BLOCKED,
  handlerFor,
} from '../../../../constants'

export const onNetworkMonitorBlocked = handlerFor(NETWORK_MONITOR_BLOCKED)

const NetworkMonitorBlocked = {
  hitType: EVENT,

  observe: NETWORK_MONITOR_BLOCKED,

  [onNetworkMonitorBlocked]() {
    this.send(...arguments)
  },

  configure(options) {
    return {
      eventCategory: NETWORK_METRICS,
      eventAction: BLOCKED,
      eventValue: options.duration,
    }
  },
}

export { NetworkMonitorBlocked }
