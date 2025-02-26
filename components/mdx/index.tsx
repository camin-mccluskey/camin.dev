import Image from "next/image";
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  img: ({ src, alt, ...props }) => {
    if (!src) return null;

    if (src.startsWith('http')) {
      // For external images
      return <img src={src} alt={alt || ""} {...props} />;
    }

    // For images referenced in MDX like ![alt](<path>)
    // We need to make sure they point to the symlinked location
    const filename = src.split('/').pop()
    const publicPath = `/assets/${filename}`

    const { height, width, ...rest } = props
    return (
      <Image
        src={publicPath}
        alt={alt || ""}
        style={{ maxWidth: "100%", height: "auto" }}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 600}
        {...rest}
      />
    );
  },
  Custom: () => <p>custom element</p>
}
