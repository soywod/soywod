const path = require('path')
const fs = require('fs')
const sitemap = require('sitemap')
require('dotenv').config()

const buildPaths = require('./path')

function buildSitemapFile(paths) {
  const urls = Object.keys(paths).map(path => ({
    url: path,
    changefreq: 'monthly',
    priority: 1,
  }))

  const config = {
    hostname: process.env.HOSTNAME,
    cacheTime: 3600,
    urls,
  }

  const xml = sitemap.createSitemap(config)

  fs.writeFileSync(__dirname + '/../out/sitemap.xml', xml.toString())
}

function copyRobotsFile() {
  const src = path.resolve(__dirname, '../static/robots.txt')
  const dest = path.resolve(__dirname, '../out/robots.txt')

  fs.copyFileSync(src, dest)
}

buildPaths().then(paths => {
  buildSitemapFile(paths)
  copyRobotsFile()
})
