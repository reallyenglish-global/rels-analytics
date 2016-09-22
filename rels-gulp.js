'use strict';

module.exports = {
  test: {
    dest: 'test',
    runner: 'test/runner.html',
    build: {
      source: 'spec-manifest.js',
      bundle: {
        entries: [
          './test/**/*.spec.js'
        ]
      }
    },
    vendor: {
      source: 'vendor.js',
    },
    watch: [
      {
        files: ['test/**/*.spec.js', 'lib/**/*.js'],
        tasks: ['build:test']
      },
      {
        files: ['test/spec-manifest.js'],
        tasks: ['test-runner']
      }
    ]
  }
}

