const withSASS = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images')
const withOffline = require('next-offline')

const exportPathMap = require('./utils/path')

const images = withOptimizedImages
const sass = [withSASS, {cssModules: true}]
const offline = withOffline
const plugins = [images, sass, offline]

module.exports = withPlugins(plugins, {
  exportPathMap,
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
})
