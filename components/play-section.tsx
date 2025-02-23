import { allProjects } from 'contentlayer/generated'
import { compareDesc } from "date-fns"
import { ProjectCard } from "./project-card"

export function PlaySection() {
  const projects = allProjects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-semibold text-lg">Fantasia</h2>
        <p className="italic">Artefacts beyond ideas.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
    </section>
  )
}

