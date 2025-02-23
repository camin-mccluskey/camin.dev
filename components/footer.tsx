"use client"

import { Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
]

export function Footer() {
  return (
    <footer className="py-8 space-y-8">
      <div className="w-16 h-px bg-accent mx-auto" />
      <p className="text-center italic font-serif">Art is never finished, only abandoned</p>
      <div className="flex justify-center gap-6">
        {socialLinks.map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            className="text-accent hover:text-accent/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="size-6" />
            <span className="sr-only">Social Link</span>
          </a>
        ))}
      </div>
    </footer>
  )
}

