require("dotenv").config()

const path = require("path")
const Dotenv = require("dotenv-webpack")

const withSass = require("@zeit/next-sass")
const withPlugins = require("next-compose-plugins")
const withOptimizedImages = require("next-optimized-images")
const withOffline = require("next-offline")

const exportPathMap = require("./utils/path")

const images = [withOptimizedImages]
const sass = [withSass, {cssModules: true}]
const offline = [withOffline]

module.exports = withPlugins([images, sass, offline], {
  exportPathMap,
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: "js-yaml-loader",
      },
      {
        test: /\.md$/,
        use: "raw-loader",
      },
    )

    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ]

    return config
  },
})
