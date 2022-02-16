let hitSelector, description, payload, GA

const lesson = {
  id: 'fake lesson for demo',
  position: { section: 0, stage: 1, activity: 2, interaction: 3 },
}

const hits = {
  ActivityDuration: {
    description:
      'Reports the amount of time between the activity:start and activity:complete notifications',
    track() {
      GA.onActivityComplete(lesson)
    },
  },

  FeedbackShown: {
    description: 'Reports feedback presentation. on feedback:shown notification',
    track() {
      GA.onFeedbackShown('feedback type provided by consumer')
    },
  },

  NetworkMonitorAnomaly: {
    description: 'Records a predicted network anomaly on network-monitor:anomaly notification',
    track() {
      GA.onNetworkMonitorAnomaly({
        url: 'the resource that is showing abnormal loading behaviour as provided by the consumer',
        last: 3500,
      })
    },
  },

  NetworkMonitorBlocked: {
    description: 'Records UI blocking duration on network-monitor:blocked notification',
    track() {
      GA.onNetworkMonitorBlocked({ duration: 3500 })
    },
  },

  Pageview: {
    description: 'Records a page view on interaction:start notification',
    track() {
      GA.onInteractionStart(lesson)
    },
  },

  Recognized: {
    description: 'Records a speech recoginition on interaction:recognized notification',
    track() {
      GA.onInteractionRecognized({})
    },
  },
}

window.onload = () => {
  hitSelector = document.querySelector('#hit')
  description = document.querySelector('#description')
  payload = document.querySelector('#payload')

  hitSelector.addEventListener('change', () => {
    const hit = hits[hitSelector.value]
    description.innerHTML = hit.description
    hit.track()
  })

  GA = window.RelsAnalytics.trackers['google-analytics-web']

  GA.activate('some-property-id').then(() => {
    GA.onActivityStart(lesson)
    GA.onSend = (fields) => {
      payload.innerHTML = JSON.stringify(fields, null, 2)
    }

    const hit = hits[hitSelector.value]
    description.innerHTML = hit.description
    hit.track()
  })
}
