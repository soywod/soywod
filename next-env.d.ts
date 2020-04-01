/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.scss" {
  const content: {[className: string]: string}
  export default content
}

declare module "*.jpeg?size=80" {
  export const src: string
  const src: string
  export default src
}

declare module "*.jpeg?size=1024" {
  export const src: string
  const src: string
  export default src
}
