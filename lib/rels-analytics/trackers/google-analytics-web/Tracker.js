'use strict';
var _ = require('underscore');
var $ = require('jquery');

var Hit = require('./Hit');
var Observable = require('../../mixins/Observable');

var hits = require('./hits');
var relays = require('../../helpers/relays');



module.exports = {

  activate: function(propertyId) {

    // Need this on window as it is
    // used by the analytics.js file
    // we inject.
    window.ga = function(){
      window.ga.q = [];
      window.ga.q.push(arguments);
    };

    window.ga.l = new Date();

    var success = _.bind(this.afterActivate, this, propertyId);

    var error = function() {
      console.log('Google analytics could not be activated');
    }

    return $.ajax(this.analytics)
      .then(success, error);
  },

  deactivate: function() {
    this.removeObservers();
  },

  onSend: function(fields) {
    this.ga('send', fields);
  },

  afterActivate: function(propertyId) {
    (this.ga = window.ga) && delete window.ga;

    this.ga('create', propertyId, 'auto');

    _.each(hits, function(hitConfig) {
      new Hit(hitConfig)
        .observe(this, relays.relay)
        .addObserver(this, 'send');
    }, this);

    return this;
  },

  analytics: {
    method: 'GET',
    url: 'https://www.google-analytics.com/analytics.js',
    dataType: 'script',
    cache: true
  }
}

_.extend(module.exports, relays);
Observable.call(module.exports);
