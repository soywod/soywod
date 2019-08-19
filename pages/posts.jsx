import React from 'react'
import matter from 'gray-matter'

import BlogPost from '../components/BlogPost'

function BlogPostPage(props) {
  return <BlogPost {...props} />
}

BlogPostPage.getInitialProps = async ctx => {
  const {slug} = ctx.query
  const module = await import(`../posts/${slug}.md`)
  const {content, data} = matter(module.default)
  const post = {...data, content, slug}

  return {post}
}

export default BlogPostPage
