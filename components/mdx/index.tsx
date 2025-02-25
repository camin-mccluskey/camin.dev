import Image, { ImageProps } from "next/image";
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

    return (
      <Image
        src={publicPath}
        alt={alt || ""}
        width={800} // You can set defaults or use fill with a container
        height={600}
        style={{ maxWidth: "100%", height: "auto" }}
        {...props}
      />
    );
  },
  Custom: () => <p>custom element</p>
}
