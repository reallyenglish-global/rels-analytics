'use strict';

describe('RelsAnalytics', function() {

  var subject = require('../../lib/rels-analytics/RelsAnalytics');

  describe('trackers', function() {
    it('has a google-analytics-web tracker', function() {
      expect(subject.trackers['google-analytics-web']).to.exist;
    });
  });

  describe('activate', function() {
    var Tracker = require('../../lib/rels-analytics/trackers/google-analytics-web/Tracker');
    var tracker;

    before(function(done) {
      window.ga = sinon.stub();
      sinon.spy(Tracker, 'activate');
      sinon.spy(subject, 'addObserver');
      subject.activate('google-analytics-web', '1234').then(function(t) {
        tracker = t;
        done();
      });
    });

    after(function() {
      sinon.restore();
      tracker.deactivate();
    });
    it('activates the requested tracker', function() {
      expect(Tracker.activate).to.be.calledWith('1234');
    });
  })
});

