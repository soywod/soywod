const path = require('path')
const requireContext = require('require-context')

module.exports = async () => {
  const folder = path.resolve(__dirname, '../posts')
  const ctx = await requireContext(folder, true, /\.md$/)
  const slugs = ctx.keys().map(path => path.slice(0, -3))
  const defaultRoutes = {
    '/': {page: '/'},
    '/experiences': {page: '/experiences'},
    '/projects': {page: '/projects'},
    '/job': {page: '/job'},
    '/blog': {page: '/blog'},
  }

  return slugs.reduce(
    (routes, slug) => ({...routes, [`/blog/${slug}`]: {page: '/posts', query: {slug}}}),
    defaultRoutes,
  )
}
