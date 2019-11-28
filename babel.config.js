const config = {
  presets: ['@babel/preset-env'],
}

const cache = process.env.CI !== true
require('@babel/register')({ ...config, cache })

module.exports = config
