import { NextResponse } from "next/server"

export const revalidate = 86400

export async function GET() {
  return new NextResponse(cv)
}

const cv = `
  ----
  Info:
    name: Camin McCluskey
    email: camin(at)stackfix.com
    bio: I'm the Co-Founder & CTO of Stackfix, where we’re building an AI-powered marketplace that enables businesses to 
        buy, implement and optimise the right software in seconds. Previously, I co-founded another startup, 
        Telescope (we used ML for sales outreach) and was a software engineer at Skyscanner where I worked on identity 
        infrastructure.
  ----
  Links:
    github: github.com/camin-mccluskey
    linkedIn: linkedin.com/in/camin-mccluskey/
    x (twitter): x.com/caminmc
    personal site: camin.dev
  ----
  Experience:
    Stackfix (2023 - Present):
      role: Co-Founder & CTO
    Telescope (2021 - 2023):
      role: Co-Founder & CTO
    Skyscanner (2019 - 2021):
      role: Software Engineer
  ----
  What I'm working on:
    - Writing and thinking better
    - Intelligence, Neuroscience, Philosophy & what LLMs teach us (if anything) about these things
    - SaaS / ML / Startups 
    - React, Next.js, Node.js, Python, Typescript, Golang, Clojure
` 
