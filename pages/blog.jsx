import React from 'react'
import matter from 'gray-matter'
import {DateTime} from 'luxon'

import SEO from '../components/SEO'
import PostPreview from '../components/PostPreview'

const title = 'Clément DOUIN | Blog'
const desc = 'Blog tech sur mes réflexions et mes expériences.'
const tags = 'clément,douin,soywod,blog,web,javascript,react,code,tech,dev'

function BlogPage(props) {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Blog</h1>
      <hr />
      {props.posts.map(post => (
        <PostPreview key={post.slug} {...post} />
      ))}
    </>
  )
}

BlogPage.getInitialProps = async () => {
  const webpackCtx = await require.context('../posts', true, /\.md$/)
  const keys = webpackCtx.keys()
  const slugs = keys.map(path => path.slice(2, -3))
  const posts = keys
    .map(webpackCtx)
    .map(module => matter(module.default))
    .map((post, index) => ({date: post.data.date, title: post.data.title, slug: slugs[index]}))
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date)
      const dateB = DateTime.fromISO(b.date)

      if (dateA < dateB) return 1
      else if (dateA > dateB) return -1
      else return 0
    })

  return {posts}
}

export default BlogPage
