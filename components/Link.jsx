import React from 'react'
import NextLink from 'next/link'

function Link({to = '/', className = '', children, ...customProps}) {
  const targetProps = to.startsWith('/') ? {} : {target: '_blank', rel: 'noopener noreferrer'}

  return (
    <NextLink href={to} {...customProps}>
      <a className={className} {...targetProps}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
