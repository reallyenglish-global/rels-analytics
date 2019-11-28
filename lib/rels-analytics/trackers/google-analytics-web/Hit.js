var _ = require('underscore')
var Observable = require('../../mixins/Observable')

var hitTypes = {
  pageview: [],
  screenview: ['screenName'],
  event: ['eventCategory', 'eventAction'],
  transaction: [],
  item: [],
  social: ['socialNetwork', 'socialAction', 'socialTarget'],
  exception: [],
  timing: ['timingCategory', 'timingVar', 'timingValue'],
}

var Hit = function Hit(options) {
  _.extend(this, options)
  this.initialize(options)
}

Hit.prototype = {
  initialize() {},

  configure() {
    /* noop */
  },

  hitType: 'pageview',

  send() {
    var fields = this.validatedFields.apply(this, arguments)
    this.notifyObservers('onSend', fields)
  },

  validatedFields() {
    var requiredFields = hitTypes[this.hitType]
    var fields = _.extend({ hitType: this.hitType }, this.configure.apply(this, arguments))

    if (_.keys(hitTypes).indexOf(this.hitType) === -1) {
      throw new Error('Invalid Analytics hitType')
    }

    if (_.difference(requiredFields, _.keys(fields)).length) {
      throw new Error('required fields for hitType not specified')
    }

    return fields
  },
}
module.exports = Hit
Observable.call(Hit.prototype)
