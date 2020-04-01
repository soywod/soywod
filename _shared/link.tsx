import React, {FC} from "react"
import NextLink, {LinkProps as NextLinkProps} from "next/link"

type LinkProps = Omit<NextLinkProps, "href"> & {
  to: string
  className?: string
}

const Link: FC<LinkProps> = ({to, className, children, ...props}) => {
  if (to.startsWith("/")) {
    return (
      <NextLink href={to} {...props}>
        <a className={className}>{children}</a>
      </NextLink>
    )
  }

  return (
    <a className={className} href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default Link
