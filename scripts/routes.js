const path = require("path")
const requireContext = require("require-context")

module.exports = async () => {
  const folder = path.resolve(__dirname, "../blog/posts")
  const ctx = await requireContext(folder, true, /\.md$/)
  const slugs = ctx.keys().map(path => path.slice(0, -3))

  const defaultRoutes = ["", "experiences", "projects", "contact", "blog"].reduce(
    (routes, route) => ({...routes, [`/${route}`]: {page: `/${route}`}}),
    {},
  )

  return slugs.reduce(
    (routes, slug) => ({...routes, [`/blog/${slug}`]: {page: "/posts", query: {slug}}}),
    defaultRoutes,
  )
}
