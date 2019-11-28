var _ = require('underscore')

function label(parts, lesson) {
  return _.chain(parts)
    .map((part) => {
      return [part, _.result(lesson[part], 'position')]
    })
    .unshift(['', 'lesson', lesson.id])
    .flatten()
    .join('/')
    .value()
}

module.exports = [
  // Reports each 'page' of rels-lesson  as the user moves between interactions
  {
    hitType: 'pageview',

    onInteractionStart() {
      this.send.apply(this, arguments)
    },

    configure(lesson) {
      return {
        page: label(['section', 'stage', 'activity', 'interaction'], lesson),
      }
    },
  },

  // Reports feedback presentation. More specifically,
  // the evnent with deferred-transcript:trascript as the feedback
  // tells us how many people look at the transcripts.
  {
    hitType: 'event',

    onFeedbackShown() {
      this.send.apply(this, arguments)
    },

    configure(feedback) {
      return {
        eventCategory: 'Feedback',
        eventAction: 'show',
        eventLabel: feedback,
      }
    },
  },

  // Records UI blocking due to back up queued data requests.
  // The event is queue-full
  {
    hitType: 'event',

    onNetworkMonitorBlocked() {
      this.send.apply(this, arguments)
    },

    configure(options) {
      return {
        eventCategory: 'network-metrics',
        eventAction: 'blocked',
        eventValue: options.duration,
      }
    },
  },

  {
    hitType: 'event',

    onNetworkMonitorAnomaly() {
      this.send.apply(this, arguments)
    },

    configure(anomaly) {
      return {
        eventCategory: 'network-metrics',
        eventAction: 'anomaly',
        eventLabel: anomaly.url,
        eventValue: anomaly.last,
      }
    },
  },

  // Reports the amount of time the student spend between the start
  // and end of an activity.
  {
    hitType: 'timing',

    onActivityStart() {
      this.startAt = new Date()
    },

    onActivityComplete() {
      this.send.apply(this, arguments)
    },

    configure(lesson) {
      return {
        timingCategory: 'Activity',
        timingVar: 'activity_duration',
        timingValue: new Date() - (this.startAt || new Date()),
        timingLabel: label(['section', 'stage', 'activity'], lesson),
      }
    },
  },
]
