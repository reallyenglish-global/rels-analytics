'use strict';

var _ = require('underscore');

var hitTypes = {
  pageview: [],
  screenview: ['screenName'],
  event: ['eventCategory', 'eventAction'],
  transaction: [],
  item: [],
  social: ['socialNetwork', 'socialAction', 'socialTarget'],
  exception: [],
  timing: ['timingCategory', 'timingVar', 'timingValue']
}

var Hit = function(options) {
  _.extend(this, options);
  this.ga || (this.ga = window.ga);
  this.initialize(options);
}

Hit.prototype = {

  initialize: function(options) {},


  configure: function() {
    // noop - should be spefied instantiator
  },

  hitType: 'pageview',

  send: function() {
    var fields = this.validatedFields.apply(this, arguments);
    this.ga('send', fields);
  },

  validatedFields: function() {
    var requiredFields = hitTypes[this.hitType];
    var fields = _.extend({ hitType: this.hitType }, this.configure.apply(this, arguments));

    if(_.keys(hitTypes).indexOf(this.hitType) === -1) {
      throw 'Invalid Analytics hitType';
    }

    if(_.difference(requiredFields, _.keys(fields)).length) {
      throw "required fields for hitType not specified"
    }

    return fields;
  }
};

module.exports = Hit;

