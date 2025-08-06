import { format, parseISO } from 'date-fns'
import { allPosts } from '@/lib/content'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { Post as PostT, PostMdx } from '@/.contentlayer/generated'
import { mdxComponents } from '@/components/mdx'
import parse, { DOMNode } from 'html-react-parser';
import { isValidElement, ReactNode } from 'react'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  const { seo: { title, description } } = post
  return {
    title, description, openGraph: {
      title,
      description
    }
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.updatedAt} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <Content {...post} />
    </article>
  )
}

const Content = (post: PostT | PostMdx) => {
  return (
    <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 prose dark:prose-invert prose-a:link">
      {post.type === 'PostMdx' ? (
        <RichContent {...post} />
      ) : (
        <PlainContent {...post} />
      )}
    </div>
  )
}

const imgTransform = (node: ReactNode) => {
  if (isValidElement(node) && node.type === 'img') {
    return <img src={`/assets/${node.props.src}`} alt={node.props.alt} />
  }
  return node
}

const PlainContent = (post: PostT) => {
  return <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 prose dark:prose-invert">{parse(post.body.html, { transform: imgTransform })}</div>
}

const RichContent = (post: PostMdx) => {
  const MDXContent = useMDXComponent(post.body.code)
  return <MDXContent components={mdxComponents} />
}
