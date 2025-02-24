import { Post, PostMdx } from 'contentlayer/generated'
import { format, parseISO } from "date-fns"
import Link from "next/link"

export function PostCard(post: Post | PostMdx) {
  return (
    <Link href={post.url} className="pb-2 group">
      <span className="flex items-center justify-between py-2">
        <p className="underline group-hover:decoration-accent group-hover:text-accent transition-colors underline-offset-4 underline-2">{post.title}</p>
        <p className="text-sm text-muted">
          {format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
        </p>
      </span>
      <p className="text-sm line-clamp-2 text-ellipsis w-3/4">
        {post.seo.description}
      </p>
    </Link>
  )
}
