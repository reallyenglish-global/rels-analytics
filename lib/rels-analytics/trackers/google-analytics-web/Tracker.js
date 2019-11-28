var _ = require('underscore')
var $ = require('jquery')

var Hit = require('./Hit')
var Observable = require('../../mixins/Observable')

var hits = require('./hits')
var relays = require('../../helpers/relays')

module.exports = {
  activate(propertyId) {
    // Need this on window as it is
    // used by the analytics.js file
    // we inject.
    window.ga = () => {
      window.ga.q = []
      window.ga.q.push(arguments)
    }

    window.ga.l = new Date()

    const success = _.bind(this.afterActivate, this, propertyId)

    const error = () => {
      console.log('Google analytics could not be activated') /* eslint-disable-line no-console */
    }

    return $.ajax(this.analytics).then(success, error)
  },

  deactivate() {
    this.removeObservers()
  },

  onSend(fields) {
    this.ga('send', fields)
  },

  afterActivate(propertyId) {
    this.ga = window.ga
    delete window.ga

    this.ga('create', propertyId, 'auto')

    _.each(
      hits,
      function configure(hitConfig) {
        new Hit(hitConfig).observe(this, relays.relay).addObserver(this, 'send')
      },
      this,
    )

    return this
  },

  analytics: {
    method: 'GET',
    url: 'https://www.google-analytics.com/analytics.js',
    dataType: 'script',
    cache: true,
  },
}

_.extend(module.exports, relays)
Observable.call(module.exports)
