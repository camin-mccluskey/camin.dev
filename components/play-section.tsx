import { Box, Cpu, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    name: "Hardware Dashboard",
    description: "Real-time monitoring for IoT devices",
    icon: Cpu,
  },
  {
    name: "Open Source CLI",
    description: "Command-line tools for developers",
    icon: Code,
  },
  {
    name: "Project Manager",
    description: "Simple and efficient task tracking",
    icon: Box,
  },
]

export function PlaySection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-semibold">Fantasia</h2>
        <p className="italic">Artefacts beyond ideas</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
        ))}
      </div>
    </section>
  )
}

