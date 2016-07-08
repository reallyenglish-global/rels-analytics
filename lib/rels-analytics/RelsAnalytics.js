'use strict';

var _ = require('underscore');

var Observable = require('./mixins/Observable');
var relays = require('./helpers/relays');
/*
 * Example:
 *
 * You can specify options on activity to provide a different ga object
 * Tracker = RelsAnalytics.activate('google-analytics-web');
 * relsLesson.addObserver(Tracker);
 */

module.exports = {

  activate: function(name, options) {
    return this.trackers[name].activate(options).then(function(tracker) {
      tracker.observe(module.exports, relays.relay);
      return tracker;
    });
  },

  trackers: {
    'google-analytics-web': require('./trackers/google-analytics-web/Tracker')
  }
};

_.extend(module.exports, relays);
Observable.call(module.exports);
