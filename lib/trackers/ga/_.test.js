import lolex from 'lolex'
import GA from './'
import Hit from './hit'
import {
  FeedbackShown,
  Recognized,
  Pageview,
  NetworkMonitorAnomaly,
  NetworkMonitorBlocked,
  ActivityDuration,
} from './hits'

const lesson = {
  id: 'foo',
  position: { section: 0, stage: 1, activity: 2, interaction: 3 },
}

describe('Google Analytics Web GA', () => {
  before((done) => {
    GA.activate('property-id').then(() => {
      sinon.spy(GA, 'ga')
      done()
    })
  })

  after(() => {
    sinon.restore()
    GA.deactivate()
  })

  describe('interaction:start', () => {
    it('reports a pageview', () => {
      const payload = new Hit(Pageview).payload(lesson)

      GA.onInteractionStart(lesson)

      expect(GA.ga).to.be.calledWith('send', payload)
    })
  })

  describe('feedback:shown', () => {
    it('reports a event', () => {
      const feedback = 'somefeedback'
      const payload = new Hit(FeedbackShown).payload(feedback)

      GA.onFeedbackShown(feedback)

      expect(GA.ga).to.be.calledWith('send', payload)
    })
  })

  describe('recognized', () => {
    it('reports a event', () => {
      const payload = new Hit(Recognized).payload()

      GA.onInteractionRecognized({})

      expect(GA.ga).to.be.calledWith('send', payload)
    })
  })

  describe('network-monitor:anomaly', () => {
    it('reports a event', () => {
      const anomaly = { url: 'some url', last: 3500 }
      const payload = new Hit(NetworkMonitorAnomaly).payload(anomaly)

      GA.onNetworkMonitorAnomaly(anomaly)

      expect(GA.ga).to.be.calledWith('send', payload)
    })
  })

  describe('network-monitor:blocked', () => {
    it('reports a event', () => {
      const block = { duration: 250 }
      const payload = new Hit(NetworkMonitorBlocked).payload(block)

      GA.onNetworkMonitorBlocked(block)

      expect(GA.ga).to.be.calledWith('send', payload)
    })
  })

  describe('activity:start -> activity:complete', () => {
    it('reports a user timing', () => {
      const hit = new Hit(ActivityDuration)
      const clock = lolex.install()
      hit.startAt = new Date()

      GA.onActivityStart(lesson)
      clock.tick(1)
      GA.onActivityComplete(lesson)

      expect(GA.ga).to.be.calledWith('send', hit.payload(lesson))

      clock.uninstall()
    })
  })
})
