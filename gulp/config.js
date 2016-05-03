'use strict';

var test = './test/';
var lib = './lib/';
var analytics = './lib/rels-analytics';

module.exports = {

  shared: {

    paths: {
      alljs: ['lib/**/*.js'],
      test: ['test/**/*.spec.js']
    },

    vendor: {},

    browserSync: {
      dev: {
        port: 3000,
        server: {
          baseDir: ['./', 'test']
        }
      }
    }
  },
  test: {
    watched: {
      support: [test +'support/**/*.js'],
      manifest: [test + 'spec-manifest']
    },
    build: {
      source: 'spec-manifest.js',
      bundle: {
        entries: [test + 'support/setup.js', test + '/**/*.spec.js'
        ]
      }
    },
    vendor: {
      source: 'vendor.js',
    },
    dest: 'test'
  }
}