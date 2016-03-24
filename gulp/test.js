'use strict';

var gulp = require('gulp');
var browser = require('browser-sync');

gulp.task('test', ['lint', 'test-build'], function(){

  gulp.watch(['lib/**/*.js', 'test/**/*.spec.js','test/support/**/*.js'], ['test-build']);
  var bs = browser.create();

  bs.watch(["test/spec-manifest.js"], function() {
    bs.reload();
  });


  bs = browser.init({
    server: {
      baseDir: ['./', 'test']
    }
  });
});
