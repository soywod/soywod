import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

/* Every CTA on a static site is a navigation, so Button renders an anchor. */
export function Button({ href, children, variant = "primary", size = "md", external = false }: ButtonProps) {
  const className = size === "sm" ? `btn btn--${variant} btn--sm` : `btn btn--${variant}`;

  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
