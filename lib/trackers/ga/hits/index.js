import ActivityDuration from './activity_duration'
import FeedbackShown from './feedback_shown'
import NetworkMonitorAnomaly from './network_monitor_anomaly'
import NetworkMonitoryBlocked from './network_monitor_blocked'
import Pageview from './pageview'
import Recognized from './recognized'

export { default as ActivityDuration } from './activity_duration'
export { default as Recognized } from './recognized'
export { default as FeedbackShown } from './feedback_shown'
export { default as NetworkMonitorBlocked } from './network_monitor_blocked'
export { default as NetworkMonitorAnomaly } from './network_monitor_anomaly'
export { default as Pageview } from './pageview'

export default {
  ActivityDuration,
  FeedbackShown,
  NetworkMonitorAnomaly,
  NetworkMonitoryBlocked,
  Pageview,
  Recognized,
}
