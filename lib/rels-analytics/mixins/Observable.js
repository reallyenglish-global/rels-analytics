var _ = require('underscore')

var eventToCallback = require('../helpers/eventToCallback')

module.exports = function Observable() {
  Object.assign(this, {
    observe(subject, events) {
      subject.addObserver(this, events)
      return this
    },

    unobserve(subject, events) {
      var targets = _.pick(subject._events, events)
      _.each(
        targets,
        function unobserve(observers) {
          var index = observers.indexOf(this)
          index !== -1 && observers.splice(index, 1)
        },
        this,
      )
      return this
    },

    addObserver(observer, events) {
      this.addObserving.call(observer, this)

      this._events || (this._events = {})
      _.each(
        [].concat(events),
        function add(event) {
          var method = eventToCallback(event)
          this._events[method] || (this._events[method] = [])
          this._events[method].push(observer)
        },
        this,
      )
      return this
    },

    addObserving(observed) {
      this._observing || (this._observing = [])
      const index = this._observing.indexOf(observed)
      index === -1 && this._observing.push(observed)
    },

    removeObserver(observer) {
      _.each(
        this._events,
        function remove(observers) {
          var index = observers.indexOf(observer)
          index !== -1 && observers.splice(index, 1)
        },
        this,
      )
      return this
    },
    removeObservers(detatch) {
      this._events = {}
      if (detatch) {
        _.each(
          this._observing,
          function remove(observed) {
            observed.removeObserver(this)
          },
          this,
        )
      }
      return this
    },

    notifyObservers(method) {
      this._events || (this._events = {})
      let observers = _.compact(this._events[method])
      let args = Array.prototype.splice.call(arguments, 1)
      let propagate = true

      _.each(observers, function notify(value) {
        let func = value[method]
        if (_.isFunction(func) && propagate !== false) {
          propagate = func.apply(value, args)
        }
      })

      return propagate
    },
  })

  const wrap = function wrap(event, broadcastWith) {
    var method = eventToCallback(event)
    var preDefined = this[method]

    this[method] = function proxy() {
      let args = _.toArray(arguments)
      let propagate = true
      if (_.isFunction(preDefined)) {
        propagate = preDefined.apply(this, args)
      }

      if (propagate !== false) {
        // The first argument should be the broadcast method
        // Which is, in this model simply 'inspect'
        broadcastWith && args.unshift(_.result(this, broadcastWith))
        args.unshift(method)
        this.notifyObservers.apply(this, args)
      }
    }
  }

  // relay simply notifies observers forwarding any
  // data provided and should be used to bubble up from subnodes
  _.each(
    _.extend({}, this.relay),
    function relay(event) {
      wrap.call(this, event)
    },
    this,
  )

  // broadcast ensures that the first parameter is a cloned state object
  // talking to external libraries.
  _.each(
    _.extend({}, this._broadcast),
    function broadcast(event) {
      let method = eventToCallback(event)
      let predefined = this[method]
      this[method] = function proxy() {
        let args = _.toArray(arguments)
        args.unshift(_.result(this, 'inspect'))
        predefined && predefined.apply(this, args)
      }
    },
    this,
  )

  // Transpose takes received broadcasts and maps them on to a local
  // event broker. Any predefined handle for the broadcast will be executed
  // before the broadcast is triggered
  _.each(
    _.extend({}, this.transpose),
    function transpose(event, observable) {
      var predefined = this[observable]
      this[observable] = function proxy() {
        var args = _.toArray(arguments)
        predefined && predefined.apply(this, args)
        if (this.trigger) {
          this.trigger.apply(this, [event].concat(args))
        }
      }
    },
    this,
  )
}
