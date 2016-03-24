'use strict';

var gulp = require('gulp');
var nodeResolve = require('resolve');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var _ = require('underscore');

gulp.task('test-vendor' , function(cb) {

  var bundle = browserify({debug: false})
  var dependencies = _.keys(require('../package.json').dependencies);

  _.each(dependencies, function(dependency) {
    this.require(nodeResolve.sync(dependency), {expose: dependency});
  }, bundle);

  bundle.bundle()
  .pipe(source('vendor.js'))
  .pipe(gulp.dest('test/'));

  cb();
});

