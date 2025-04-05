import { format, parseISO } from 'date-fns'
import { allPosts } from '@/lib/content'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Post as PostT, PostMdx } from '@/.contentlayer/generated'
import { mdxComponents } from '@/components/mdx'
import { z } from 'zod'

// TODO: 
// - put some zod schema here
// - pull from file in repo I guess
// - output is just below
//
const btpPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
})
type PTBPost = z.infer<typeof btpPostSchema>

const POSTS: Array<PTBPost> = [
  { slug: 'something', title: 'Camin is something...', description: "Full prompt", body: 'Full post body' }
]


export const generateStaticParams = async () => {
  POSTS.map((post) => ({ slug: post.slug }))
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = POSTS.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  const { title, description } = post
  return {
    title, description, openGraph: {
      title,
      description
    }
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = POSTS.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <PlainContent {...post} />
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

const PlainContent = (post: PostT) => {
  return <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.body.html }} />
}

const RichContent = (post: PostMdx) => {
  const MDXContent = useMDXComponent(post.body.code)
  return <MDXContent components={mdxComponents} />
}
