import React from "react"
import {NextPage} from "next"
import ReactMarkdown from "react-markdown"
import {DiscussionEmbed} from "disqus-react"
import {DateTime} from "luxon"
import matter from "gray-matter"

import SEO from "../../_shared/seo"
import Link from "../../_shared/link"
import IconBack from "../../_shared/icon-back"
import CodeBlock from "../../_shared/code-block"

import cs from "./_page.scss"

export type Post = {
  title: string
  slug: string
  desc: string
  tags: string[]
  content: string
  date: string
}

type PostPageProps = {
  post: Post
}

const PostPage: NextPage<PostPageProps> = ({post}) => {
  const {date, title, desc, tags, content, slug} = post
  const disqusConfig = {url: process.env.HOSTNAME + "/blog/" + slug, identifier: slug, title}

  return (
    <>
      <SEO
        title={"Clément DOUIN | " + title}
        desc={desc}
        tags={["clément", "douin", "blog", "soywod"].concat(tags).join(",")}
        url={`/blog/${slug}`}
      />
      <h1 className={cs.title}>
        <Link className={cs.back} to="/blog">
          <IconBack />
        </Link>
        <span>{title}</span>
        <em>{DateTime.fromISO(date).toRelative()}</em>
      </h1>

      <div className={cs.tags}>
        {tags.map(tag => (
          <span key={tag} className={cs.tag}>
            {tag}
          </span>
        ))}
      </div>

      <hr />

      <ReactMarkdown source={content} renderers={{code: CodeBlock}} />
      <DiscussionEmbed shortname={process.env.DISQUS_SHORTNAME} config={disqusConfig} />
    </>
  )
}

PostPage.getInitialProps = async ctx => {
  const {slug} = ctx.query
  const module = await import(`./${slug}.md`)
  const {content, data} = matter(module.default)
  const {title, desc, tags, date} = data
  const post: Post = {title, slug: String(slug), desc, tags, date, content}

  return {post}
}

export default PostPage
