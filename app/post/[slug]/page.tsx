import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  console.log(allPosts)
  console.log(params)
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
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  )
}
