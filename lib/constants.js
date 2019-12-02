export const GOOGLE_ANALYTICS_WEB = 'google-analytics-web'
export const PAGEVIEW = 'pageview'
export const EVENT = 'event'
export const TIMING = 'timing'

export const INTERACTION_START = 'interaction:start'

export const ACTIVITY_START = 'activity:start'
export const ACTIVITY_COMPLETE = 'activity:complete'

export const INTERACTION_RECOGNIZED = 'interaction:recognized'
export const FEEDBACK_SHOWN = 'feedback:shown'
export const NETWORK_MONITOR_BLOCKED = 'network-monitor:blocked'
export const NETWORK_MONITOR_ANOMALY = 'network-monitor:anomaly'

export const FEEDBACK = 'Feedback'
export const SHOW = 'show'

export const NETWORK_METRICS = 'network-metrics'
export const BLOCKED = 'blocked'
export const ANOMALY = 'anomaly'

export const THIRD_PARTY_API = 'third-party-api'
export const SPEECHACE = 'speechace'
export const RECOGNIZE = 'recognize'

export const ACTIVITY = 'Activity'
export const ACTIVITY_DURATION = 'activity_duration'

export const RELAY = [
  INTERACTION_START,
  ACTIVITY_START,
  INTERACTION_RECOGNIZED,
  ACTIVITY_COMPLETE,
  FEEDBACK_SHOWN,
  NETWORK_MONITOR_BLOCKED,
  NETWORK_MONITOR_ANOMALY,
]
export const handlerFor = (event) => {
  if (event === undefined) {
    throw new Error('Unknown event constant passed into constants#handlerFor')
  }

  const parts = event.split(/[:|-]/)
  const capitalized = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.substring(1).toLowerCase(),
  )
  return `on${capitalized.join('')}`
}
