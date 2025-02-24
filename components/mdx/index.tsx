import Image, { ImageProps } from "next/image";
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  Image: (props: ImageProps) => <Image {...props} alt="" />,
  Custom: () => <p>custom element</p>
}
