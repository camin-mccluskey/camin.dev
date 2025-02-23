import { Card, CardContent } from "@/components/ui/card"

export function ProjectCard() {
  return (
    <Card key={project.name} className="group hover:scale-105 transition-transform cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <project.icon className="w-5 h-5 stroke-[1.75px] text-accent" />
          <h3 className="font-semibold text-lg">{project.name}</h3>
        </div>
        <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          {project.description}
        </p>
      </CardContent>
    </Card>

  )
}
