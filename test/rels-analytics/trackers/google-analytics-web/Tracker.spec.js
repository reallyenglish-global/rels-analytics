var lolex = require('lolex')
var clock
var Tracker = require('../../../../lib/rels-analytics/trackers/google-analytics-web/Tracker')

describe('Google Analytics Web Tracker', () => {
  var lesson = {
    id: 'foo',
    section: { position: 0 },
    stage: { position: 1 },
    activity: { position: 2 },
    interaction: { position: 3 },
  }

  before((done) => {
    Tracker.activate('property-id').then(() => {
      sinon.spy(Tracker, 'ga')
      done()
    })
  })

  after(() => {
    sinon.restore()
    Tracker.deactivate()
  })

  describe('interaction:start', () => {
    it('reports a pageview', () => {
      Tracker.onInteractionStart(lesson)
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'pageview',
        page: '/lesson/foo/section/0/stage/1/activity/2/interaction/3',
      })
    })
  })

  describe('feedback:shown', () => {
    it('reports a event', () => {
      Tracker.onFeedbackShown('somefeedback')
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'Feedback',
        eventAction: 'show',
        eventLabel: 'somefeedback',
      })
    })
  })

  describe('interaction:recognized', () => {
    it('reports a event', () => {
      Tracker.onInteractionRecognized({})
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'third-party-api',
        eventAction: 'speachace',
        eventLabel: 'recognize',
      })
    })
  })

  describe('network-monitor:anomaly', () => {
    it('reports a event', () => {
      Tracker.onNetworkMonitorAnomaly({
        url: 'some url',
        last: 3500,
      })

      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'network-metrics',
        eventAction: 'anomaly',
        eventLabel: 'some url',
        eventValue: 3500,
      })
    })
  })

  describe('network-monitor:blocked', () => {
    it('reports a event', () => {
      Tracker.onNetworkMonitorBlocked({ duration: 250 })
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'network-metrics',
        eventAction: 'blocked',
        eventValue: 250,
      })
    })
  })

  describe('activity:start -> activity:complete', () => {
    it('reports a user timing', () => {
      clock && clock.uninstall()
      clock = lolex.install()
      Tracker.onActivityStart(lesson)
      clock.tick(1)
      Tracker.onActivityComplete(lesson)

      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'timing',
        timingCategory: 'Activity',
        timingVar: 'activity_duration',
        timingValue: 1,
        timingLabel: '/lesson/foo/section/0/stage/1/activity/2',
      })

      clock.uninstall()
    })
  })
})
