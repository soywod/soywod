import React from "react"
import NextLink from "next/link"

function Link({className, to, children, ...props}) {
  if (to.startsWith("/")) {
    return (
      <NextLink href={to} {...props}>
        <a className={className}>{children}</a>
      </NextLink>
    )
  }

  return (
    <a className={className} href={to} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

export default Link
