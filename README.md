# Blog [![Netlify Status](https://api.netlify.com/api/v1/badges/c3a547f0-be12-4181-ba8d-842448882b33/deploy-status)](https://app.netlify.com/sites/blog-soywod/deploys)

Blog about my reflections, experiences and experiments. Written in JavaScript
with [React](https://reactjs.org/) and [Next.js](https://nextjs.org/).

## Structure

  - `/pages`: Next.js pages (`/` and `/posts/:slug`)
  - `/components`: React components
  - `/posts`: All posts written in Markdown

## Development

Clone the repo:

```bash
git clone https://github.com/soywod/blog.git
```

Install dependencies:

```bash
yarn install
```

Start the Next.js development server:

```bash
yarn start
```

To build a static version of the blog:

```bash
yarn export
```
