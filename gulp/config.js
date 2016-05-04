'use strict';

var test = './test/';

module.exports = {

  shared: {
    paths: {
      alljs: ['lib/**/*.js'],
      alltest: ['test/**/*.spec.js'],
      testSupport: ['./test/support/**/*.js'],
      testManifest: ['./test/spec-manifest']
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
