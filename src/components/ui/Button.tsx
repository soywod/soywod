import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

/* Every CTA on a static site is a navigation, so Button renders an anchor. */
export function Button({ href, children, variant = "primary", size = "md", external = false }: ButtonProps) {
  return (
    <a
      href={href}
      className={`btn btn--${variant} btn--${size}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
