'use strict';

var lolex = require('lolex')
var clock;

describe('Google Analytics Web Tracker', function() {
  var Tracker = require('../../../../lib/rels-analytics/trackers/google-analytics-web/Tracker');
  var lesson = {
    id: 'foo',
    section: { position: 0 },
    stage: { position: 1 },
    activity: { position: 2 },
    interaction: { position: 3 }
  };

  before(function(done) {
    Tracker.activate('property-id').then(function() {
      sinon.spy(Tracker, 'ga');
      done();
    });
  });

  after(function() {
    sinon.restore();
    Tracker.deactivate();
  });

  describe('interaction:start', function() {
    before(function() {
      Tracker.onInteractionStart(lesson);
    });

    it('reports a pageview', function() {
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'pageview',
        page: '/lesson/foo/section/0/stage/1/activity/2/interaction/3'
      });
    });
  });

  describe('feedback:shown', function() {
    before(function() {
      Tracker.onFeedbackShown('somefeedback');
    });

    it('reports a event', function() {
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'Feedback',
        eventAction: 'show',
        eventLabel: 'somefeedback'
      });
    });
  });

  describe('network-monitor:anomaly', function() {
    before(function() {
      Tracker.onNetworkMonitorAnomaly({
        url: 'some url',
        last: 3500
      });
    });

    it('reports a event', function() {
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'network-metrics',
        eventAction: 'anomaly',
        eventLabel: 'some url',
        eventValue: 3500,
      });
    });
  });

  describe('network-monitor:blocked', function() {
    before(function() {
      Tracker.onNetworkMonitorBlocked({duration: 250})
    });

    it('reports a event', function() {
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'network-metrics',
        eventAction: 'blocked',
        eventValue: 250,
      });
    });
  });

  describe('activity:start -> activity:complete', function() {
    before(function() {
      clock && clock.uninstall()
      clock = lolex.install()
      Tracker.onActivityStart(lesson);
      clock.tick(1);
      Tracker.onActivityComplete(lesson);
    });

    after(function() {
      clock.uninstall();
    });

    it('reports a user timing', function() {
      expect(Tracker.ga).to.be.calledWith('send', {
        hitType: 'timing',
        timingCategory: 'Activity',
        timingVar: 'activity_duration',
        timingValue: 1,
        timingLabel: '/lesson/foo/section/0/stage/1/activity/2'
      });
    });
  });
});
