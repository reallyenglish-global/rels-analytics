import subject from './'
import GA from './trackers/ga'

describe('RelsAnalytics', () => {
  describe('trackers', () => {
    it('has a google-analytics-web tracker', () => {
      expect(subject.trackers['google-analytics-web']).to.exist
    })
  })

  describe('activate', () => {
    it('activates the requested tracker', (done) => {
      var tracker
      window.ga = sinon.stub()
      sinon.spy(GA, 'activate')
      sinon.spy(subject, 'addObserver')
      subject.activate('google-analytics-web', '1234').then((t) => {
        tracker = t
        expect(GA.activate).to.be.calledWith('1234')
        sinon.restore()
        tracker.deactivate()
        done()
      })
    })
  })
})
