/* global ga */
'use strict';
var _ = require('underscore');
var $ = require('jquery');

var Hit = require('./Hit');
var Observable = require('../../mixins/Observable');

var hits = require('./hits');
var relays = require('../../helpers/relays');

module.exports = {

  activate: function(propertyId) {
    ga('create', propertyId, 'auto');
    return $.ajax({
      method: 'GET',
      url: 'https://www.google-analytics.com/analytics_debug.js',
      dataType: 'script',
      cache: true
    }).then(function() {
      module.exports.ga = window.ga;

      _.each(hits, function(hitConfig) {
        new Hit(hitConfig)
          .observe(this, relays.relay)
          .addObserver(this, 'send');
      }, module.exports);

      return module.exports;
    },
    function() {
      console.log('Google analytics could not be activated');
    });
  },

  deactivate: function() {
    this.removeObservers();
  },

  onSend: function(fields) {
    this.ga('send', fields);
  }
}
_.extend(module.exports, relays);
Observable.call(module.exports);
