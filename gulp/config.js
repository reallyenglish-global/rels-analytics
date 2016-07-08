'use strict';

module.exports = {
  shared: {
    vendor: {},
    paths: {
      build: ['lib/**/*.js'],
      test: ['test/**/*.spec.js']
    },
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
        entries: [
          './test/**/*.spec.js',
          './test/support/setup.js'
        ]
      }
    },
    vendor: {
      source: 'vendor.js',
    },
    dest: 'test'
  }
}
