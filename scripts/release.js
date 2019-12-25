/* eslint-disable no-console */

// This script will generate a new release as per semanticRelease when
// the master branch job passes.

const semanticRelease = require('semantic-release')
const { TRAVIS_BRANCH } = process.env

if (!['master'].includes(TRAVIS_BRANCH)) {
  console.log(`branch ${TRAVIS_BRANCH} does not release`)
  return
}

semanticRelease({
  branch: 'master',
  repositoryUrl: 'git@github.com:reallyenglish-global/rels-analytics.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
})
