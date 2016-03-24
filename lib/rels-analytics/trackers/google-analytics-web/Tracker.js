'use strict';
var _ = require('underscore');

var Hit = require('./Hit');
var Observable = require('../../mixins/Observable');

var hits = require('./hits');
var relays = require('../../helpers/relays');

module.exports = {

  activate: function(options) {
    var parse = _.partial(this._parseHit, _, options);
    _(hits).each(parse, this);
    return this;
  },

  _parseHit: function(config, options) {
    var hit = new Hit(_.extend(config, options));
    this.addObserver(hit);
  }
}

_.extend(module.exports, relays);
Observable.call(module.exports);
