import { allPosts } from 'contentlayer/generated'
import { compareDesc } from "date-fns"
import { PostCard } from "./post-card"


export function WorkSection() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-semibold text-lg">Intelletto</h2>
        <p className="italic">Evergreen and envolving notes on various topics</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </section>
  )
}

