import { allPosts } from 'contentlayer/generated'
import { compareDesc } from "date-fns"
import { PostCard } from "./post-card"
import { Asterisk } from './icons/asterisk'


export function WorkSection() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.updatedAt), new Date(b.updatedAt)))
  return (
    <section className="space-y-8">
      <div>
        <span className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-lg">Intelletto</h2>
          <Asterisk className='size-8' />
        </span>
        <p className="italic">Evergreen and envolving notes on various topics.</p>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </section>
  )
}

