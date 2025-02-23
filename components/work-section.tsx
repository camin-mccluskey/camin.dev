import { Pen, Monitor, Book } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const posts = [
  {
    title: "When Scalability Becomes Dogma",
    excerpt: "Exploring the hidden costs of premature optimization",
    tags: ["Engineering", "Philosophy"],
    icon: Monitor,
  },
  {
    title: "The Art of System Design",
    excerpt: "Building resilient architectures for modern applications",
    tags: ["Engineering", "Architecture"],
    icon: Pen,
  },
  {
    title: "Beyond the Code",
    excerpt: "Thoughts on technical leadership and team dynamics",
    tags: ["Leadership", "Culture"],
    icon: Book,
  },
]

export function WorkSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-semibold">Intelletto</h2>
        <p className="italic">Evergreen and envolving notes on various topics</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.title} className="group hover:border-accent transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <post.icon className="w-5 h-5 stroke-[1.75px] text-accent" />
                <span className="group-hover:underline decoration-accent underline-offset-4">{post.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

