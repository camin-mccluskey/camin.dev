import { Post } from 'contentlayer/generated'
import { format, parseISO } from "date-fns"
import Link from "next/link"

export function PostCard(post: Post) {
  return (
    <Link href={post.url} className="border-b last:border-none group pb-4">
      <span className="flex items-center justify-between py-2">
        <p className="underline group-hover:decoration-accent group-hover:text-accent transition-colors underline-offset-4 underline-2">{post.title}</p>
        <p className="text-sm text-muted">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </p>
      </span>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </Link>
  )

}
