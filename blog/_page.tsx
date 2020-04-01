import React from "react"
import {NextPage} from "next"
import matter from "gray-matter"
import {DateTime} from "luxon"

import SEO from "../_shared/seo"
import Link from "../_shared/link"
import {Post} from "./posts/_page"

import cs from "./_page.scss"

const title = "Clément DOUIN | Blog"
const desc = "Blog tech sur mes réflexions et mes expériences."
const tags = "clément,douin,soywod,blog,web,javascript,react,code,tech,dev"

type BlogPageProps = {
  posts: Post[]
}

const BlogPage: NextPage<BlogPageProps> = ({posts}) => {
  return (
    <>
      <SEO title={title} desc={desc} tags={tags} />
      <h1>Blog</h1>
      <hr />
      {posts.map(post => (
        <div key={post.slug} className={cs.post}>
          <em className={cs.date}>
            {DateTime.fromISO(post.date, {locale: "fr"}).toFormat("dd LLL yyyy")}
          </em>
          <span className={cs.separator}>{" > "}</span>
          <Link to={`/posts?slug=${post.slug}`} as={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </>
  )
}

BlogPage.getInitialProps = () => {
  const webpackCtx = require.context("./posts", false, /\.md$/)
  const keys = webpackCtx.keys()
  const slugs = keys.map(path => path.slice(2, -3))
  const posts: Post[] = keys
    .map(webpackCtx)
    .map((module: {default: any}) => matter(module.default))
    .map((post, index) => ({
      title: post.data.title,
      slug: slugs[index],
      desc: "",
      tags: [],
      content: "",
      date: post.data.date,
    }))
    .sort((a: Post, b: Post) => {
      const dateA = DateTime.fromISO(a.date)
      const dateB = DateTime.fromISO(b.date)

      if (dateA < dateB) return 1
      else if (dateA > dateB) return -1
      else return 0
    })

  return {posts}
}

export default BlogPage
