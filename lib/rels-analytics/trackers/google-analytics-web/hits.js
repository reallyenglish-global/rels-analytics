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

module.exports = [

  // Reports each 'page' of rels-lesson  as the user moves between interactions
  {
    hitType: 'pageview',

    onInteractionStart: function() {
      this.send.apply(this, arguments);
    },

    configure: function(lesson) {
      return {
        page: label(['section','stage', 'activity', 'interaction'], lesson)
      }
    }
  },

  // Reports feedback presentation. More specifically,
  // the evnent with deferred-transcript:trascript as the feedback
  // tells us how many people look at the transcripts.
  {
    hitType: 'event',

    onFeedbackShown: function() {
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

  // Reports the amount of time the student spend between the start
  // and end of an activity.
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
  }
];
