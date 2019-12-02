import {
  NETWORK_MONITOR_BLOCKED,
  EVENT,
  NETWORK_METRICS,
  BLOCKED,
  handlerFor,
} from '../../../../constants'

export const onNetworkMonitorBlocked = handlerFor(NETWORK_MONITOR_BLOCKED)

// Records UI blocking due to back up queued data requests.
// The event is queue-full
export default {
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
