"use client"

import { allPosts } from '@/lib/content'
import { compareDesc } from "date-fns"
import { PostCard } from "./post-card"
import { Asterisk } from './icons/asterisk'
import { useState } from "react"
import { Button } from "./ui/button"

export function WorkSection() {
  const [visibleCount, setVisibleCount] = useState(5)

  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))
  )

  const visiblePosts = sortedPosts.slice(0, visibleCount)
  const hasMorePosts = visibleCount < sortedPosts.length

  const showMorePosts = () => {
    setVisibleCount(prev => prev + 10)
  }

  return (
    <section className="space-y-8">
      <div>
        <span className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-lg">Writing</h2>
          <Asterisk className='size-8' />
        </span>
        <p className="italic">Evergreen and envolving notes. I write to think, not to produce content. AI has been used for research but the words are my own.</p>
      </div>
      <div className="flex flex-col gap-y-2">
        {visiblePosts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
      {hasMorePosts && (
        <div className="flex justify-center">
          <Button
            onClick={showMorePosts}
            variant="outline"
          >
            Show more
          </Button>
        </div>
      )}
    </section>
  )
}

