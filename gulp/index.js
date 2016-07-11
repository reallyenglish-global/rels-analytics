'use strict';

var _ = require('underscore');
var config = require('./config');
var pack = require('../package.json');

var environments = _.reduce(config, function(memo, env, key) {
  if(key !== 'shared') {
    var options = _.extend({}, config.shared);
    memo[key] = _.extend({}, pack, options, _.pick(env, ['clean', 'build', 'dest', 'vendor']));
  }
  return memo;
}, {});

require('rels-gulp')(environments);

module.exports = true;
