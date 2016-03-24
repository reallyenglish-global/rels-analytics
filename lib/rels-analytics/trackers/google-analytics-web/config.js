'use strict';

var _ = require('underscore');

function label(parts, lesson) {
  return _.chain(parts)
  .map(function(part) {
    return [part, _.result(lesson[part], 'position')];
  })
  .unshift(['', 'lesson', lesson.id])
  .flatten()
  .join('/')
  .value();
}

module.exports = {
  hits: [

  {
    hitType: 'pageview',
    onInteractionStart: function(lesson) {
      this.send.apply(this, arguments);
    },
    configure: function(lesson) {
      return {
        page: label(['section','stage', 'activity', 'interaction'], lesson)
      }
    }
  },

  {
    hitType: 'event',
    onFeedbackShown: function(feedback) {
      this.send.apply(this, arguments);
    },

    configure: function(feedback) {
      return {
        eventCategory: 'Feedback',
        eventAction: 'show',
        eventLabel: feedback
      }
    }
  },

  {
    hitType: 'timing',
    onActivityStart: function() {
      this.startAt = new Date();
    },
    onActivityComplete: function() {
      this.send.apply(this, arguments);
    },
    configure: function(lesson) {
      return {
        timingCategory: 'Activity',
        timingVar: 'activity_duration',
        timingValue: new Date() - (this.startAt || new Date()),
        timingLabel: label(['section', 'stage', 'activity'], lesson)
      }
    }
  }]
}
