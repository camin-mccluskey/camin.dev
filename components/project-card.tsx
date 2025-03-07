import { Project } from "@/.contentlayer/generated"
import { Card, CardContent } from "@/components/ui/card"
import { GithubIcon, GlobeIcon } from "lucide-react"

export function ProjectCard(project: Project) {
  return (
    <a href={project.srcUrl}>
      <Card className="group p-2 transition cursor-pointer border-none rounded-sm shadow-none hover:border-accent">
        <CardContent className="p-0">
          <span className="flex items-center justify-between gap-3 mb-2">
            <p className="sm:group-hover:underline underline sm:no-underline underline-offset-4 underline-2 decoration-accent group-hover:text-accent">{project.name}</p>
            <LinkIcon url={project.srcUrl} />
          </span>
          <p className="text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </a>
  )
}

const LinkIcon = ({ url }: { url: string }) => {
  const className = "text-muted group-hover:text-accent size-5"
  const isGithub = url.includes('github')
  if (isGithub) return <GithubIcon className={className} />
  return <GlobeIcon className={className} />
}
