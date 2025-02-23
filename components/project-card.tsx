import { Project } from "@/.contentlayer/generated"
import { Card, CardContent } from "@/components/ui/card"
import { GithubIcon, GlobeIcon } from "lucide-react"
import Link from "next/link"

export function ProjectCard(project: Project) {
  return (
    <Link href={project.url}>
      <Card className="group transition cursor-pointer border-none rounded-sm shadow-none hover:border-accent">
        <CardContent className="p-4">
          <span className="flex items-center justify-between gap-3 mb-2">
            <p className="sm:group-hover:underline underline sm:no-underline underline-offset-4 underline-2 decoration-accent">{project.name}</p>
            <LinkIcon url={project.url} />
          </span>
          <p className="text-sm sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

const LinkIcon = ({ url }: { url: string }) => {
  const className = "text-muted group-hover:text-accent size-5"
  const isGithub = url.includes('github')
  if (isGithub) return <GithubIcon className={className} />
  return <GlobeIcon className={className} />
}
