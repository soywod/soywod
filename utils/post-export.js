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

  fs.writeFileSync(path.resolve(__dirname, '../out/sitemap.xml'), xml.toString())
}

function moveFiles(files) {
  for (const file of files) {
    const src = path.resolve(__dirname, `../out/static/${file}`)
    const dest = path.resolve(__dirname, `../out/${file}`)
    fs.renameSync(src, dest)
  }
}

buildPaths().then(paths => {
  buildSitemapFile(paths)
  moveFiles(['robots.txt', '_redirects'])
})
