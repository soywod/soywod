const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images')

const exportPathMap = require('./utils/path')

const images = [withOptimizedImages]
const sass = [withSass, {cssModules: true}]

module.exports = withPlugins([images, sass], {
  exportPathMap,
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    )

    return config
  },
})
