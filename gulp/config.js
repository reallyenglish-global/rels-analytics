'use strict';

var test = './test/';

module.exports = {

  shared: {
    paths: {
      build: ['lib/**/*.js'],
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

  demo: {
    watched: {}
  },

  test: {
    watched: {
      specs: ['test/**/*.spec.js'],
      support: ['test/support/**/*.js'],
      build: ['lib/**/*.js'],
      manifest: ['./test/spec-manifest']      
    },
    build: {
      source: 'spec-manifest.js',
      bundle: {
        entries: [test + 'support/setup.js', test + '/**/*.spec.js']
      }
    },
    vendor: {
      source: 'vendor.js',
    },
    dest: 'test'
  }
}
