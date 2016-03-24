'use strict';

describe('RelsAnalytics', function() {

  var subject = require('../../lib/rels-analytics/RelsAnalytics');
  var sandbox = sinon.sandbox.create();

  describe('trackers', function() {
    it('has a google-analytics-web tracker', function() {
      expect(subject.trackers['google-analytics-web']).to.exist;
    });
  });

  describe('activate', function() {
    var Tracker = require('../../lib/rels-analytics/trackers/google-analytics-web/Tracker');
    var tracker;
    before(function() {
      sandbox.spy(Tracker, 'activate');
      sandbox.spy(subject, 'addObserver');
      tracker = subject.activate('google-analytics-web');
    });
    after(function() {
      sandbox.restore();
    });
    it('activates the requested tracker', function() {
      expect(Tracker.activate).to.be.called;
    });

    it('return the requested tracker', function() {
      expect(tracker).to.eql(Tracker);
    });

    it('adds the tracker as an observer', function() {
      expect(subject.addObserver).to.be.calledWith(tracker)
    });
  })
});

