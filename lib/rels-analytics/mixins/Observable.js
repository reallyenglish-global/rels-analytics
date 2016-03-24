'use strict';
var _ = require('underscore');

var eventToCallback = require('../helpers/eventToCallback');

module.exports = function() {

  this.addObserver = function(observer) {
    this._observers || (this._observers = []);
    this._observers.push(observer);
    return this;
  };

  this.removeObserver = function(observer) {
    this._observers || (this._observers= []);
    var index = this._observers.indexOf(observer);
    index !== -1 && this._observers.splice(index, 1);
    return this;
  };

  this.removeObservers = function() {
    this._observers = [];
  };

  this.notifyObservers = function(handler) {
    var args = _.toArray(arguments);
    args.shift();

    _.each(this._observers, function(observer) {
      if(_.isFunction(observer[handler])) {
        observer[handler].apply(observer, args);
      }
    }, this);
  };

  var wrap = function(event, broadcastWith) {

    var method = eventToCallback(event);
    var preDefined = this[method];

    this[method] = function() {

      var args = _.toArray(arguments);

      _.isFunction(preDefined) && preDefined.apply(this, args);

      // We forbid exposing interal objects
      // when broadcasting.
      broadcastWith && (args = [_.result(this, broadcastWith)]);

      args.unshift(method);
      this.notifyObservers.apply(this, args);
    }
  };

  // relay simply notifies observers forwarding any
  // data provided and should be used to bubble up from subnodes
  _.each(_.extend({}, this.relay), function(event) {
    wrap.call(this, event);
  }, this);

  // broadcast ensures that the first parameter is a cloned state object
  // talking to external libraries.
  _.each(_.extend({}, this.broadcast), function(event) {
    wrap.call(this, event, 'inspect');
  }, this);

  // Transpose takes received broadcasts and maps them on to a local
  // event broker. Any predefined handle for the broadcast will be executed
  // before the broadcast is triggered
  _.each(_.extend({}, this.transpose), function(event, observable) {
    var predefined = this[observable];
    this[observable] = function() {
      var args = _.toArray(arguments);
      predefined && predefined.apply(this, args);
      this.trigger && this.trigger.apply(this, [event].concat(args))
    }
  }, this);

  var remove = this.remove;

  this.remove = function() {
    remove && remove.call(this);
    this.removeObservers();
  }
}

