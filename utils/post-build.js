const path = require("path")
const fs = require("fs")
const sitemap = require("sitemap")
require("dotenv").config()

const buildPaths = require("./path")

function buildSitemapFile(paths) {
  const urls = Object.keys(paths).map(path => ({
    url: path,
    changefreq: "monthly",
    priority: 1,
  }))

  const config = {
    hostname: process.env.HOSTNAME,
    cacheTime: 3600,
    urls,
  }

  const xml = sitemap.createSitemap(config)

  fs.writeFileSync(path.resolve(__dirname, "../build/sitemap.xml"), xml.toString())
}

buildPaths().then(paths => {
  buildSitemapFile(paths)
})
