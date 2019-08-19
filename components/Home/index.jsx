import React, {Fragment} from 'react'
import Link from 'next/link'
import {DateTime} from 'luxon'
import Head from 'next/head'

import avatar from '../../images/clement-douin.jpeg?size=80'

import classes from './styles.scss'

const baseUrl = 'https://blog.soywod.me'
const desc = 'Personal blog about my reflections, experiences and experiments.'

function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Blog | Clément DOUIN</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content="blog,soywod,tech,code,dev,react,typescript" />
        <meta property="og:title" content="Clément DOUIN" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soywod" />
        <meta name="twitter:creator" content="@soywod" />
        <meta name="twitter:title" content="Clément DOUIN" />
        <meta name="twitter:description" content={desc} />
      </Head>

      <article>
        <nav className={classes.nav}>
          <img src={avatar.src} alt="Clément DOUIN" />
          <h1>Hello, world!</h1>
        </nav>

        <section>
          <p>
            Hi! I'm <code>Clément DOUIN</code>, a 29 years old web developer from France. I'm a
            Linux &amp; open source enthusiast. I love React ecosystem.
          </p>

          <p>This is my blog, where I write all my reflections, experiences and experiments.</p>
        </section>

        <hr className={classes.hr} />

        <section>
          {props.posts.map(post => (
            <div key={post.slug} className={classes.post}>
              <em className={classes.date}>
                {DateTime.fromISO(post.date).toFormat('LLL dd, yyyy')}
              </em>
              <span className={classes.separator}>{' > '}</span>
              <Link href={`/posts?slug=${post.slug}`} as={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </div>
          ))}
        </section>

        <hr className={classes.hr} />

        <footer className={classes.footer}>
          <Link href="https://www.linkedin.com/in/soywod">
            <a target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Link>
          <span className={classes.separator}>{' / '}</span>
          <Link href="https://github.com/soywod">
            <a target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Link>
          <span className={classes.separator}>{' / '}</span>
          <Link href="https://stackoverflow.com/users/6213048/soywod">
            <a target="_blank" rel="noopener noreferrer">
              Stack Overflow
            </a>
          </Link>
          <span className={classes.separator}>{' / '}</span>
          <Link href="https://twitter.com/soywod">
            <a target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </Link>
        </footer>
      </article>
    </Fragment>
  )
}

export default Home
