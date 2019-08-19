import React from 'react'
import matter from 'gray-matter'

import Post from '../components/Post'

function PostPage(props) {
  return <Post {...props} />
}

PostPage.getInitialProps = async ctx => {
  const {slug} = ctx.query
  const module = await import(`../posts/${slug}.md`)
  const {content, data} = matter(module.default)
  const post = {...data, content, slug}

  return {post}
}

export default PostPage
