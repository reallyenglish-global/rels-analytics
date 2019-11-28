var _ = require('underscore')

module.exports = function eventToCallback(event) {
  var parts = event.split(/[:|-]/)
  var capitalized = _.map(parts, function capitalize(part) {
    return part.charAt(0).toUpperCase() + part.substring(1).toLowerCase()
  })
  return 'on' + capitalized.join('')
}
