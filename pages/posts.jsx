import React from 'react'
import matter from 'gray-matter'

import Post from '../components/Post'
import SEO from '../components/SEO'

function PostPage({post}) {
  const {desc} = post
  const title = 'Clément DOUIN | ' + post.title
  const tags = post.tags.concat(['clément', 'douin', 'blog', 'soywod']).join(',')
  const url = `/blog/${post.slug}`

  return (
    <>
      <SEO title={title} desc={desc} tags={tags} url={url} />
      <Post {...post} />
    </>
  )
}

PostPage.getInitialProps = async ctx => {
  const {slug} = ctx.query
  const module = await import(`../posts/${slug}.md`)
  const {content, data} = matter(module.default)
  const post = {...data, content, slug}

  return {post}
}

export default PostPage
