import { Project } from "@/.contentlayer/generated"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function ProjectCard(project: Project) {
  return (
    <Link href={project.url}>
      <Card className="group transition-transform cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg">{project.name}</h3>
          </div>
          <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
