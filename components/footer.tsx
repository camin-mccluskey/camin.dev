"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Twitter } from "lucide-react"

const quotes = [
  "Simplicity is the ultimate sophistication.",
  "Make it work, make it right, make it fast.",
  "Design is not just what it looks like. Design is how it works.",
]

const socialLinks = [
  { icon: Github, href: "https://github.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
]

export function Footer() {
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="py-8 space-y-8">
      <div className="w-16 h-px bg-accent mx-auto" />
      <p className="text-center italic font-serif text-lg">{quotes[quoteIndex]}</p>
      <div className="flex justify-center gap-6">
        {socialLinks.map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            className="text-accent hover:text-accent/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-6 h-6 stroke-[1.75px]" />
            <span className="sr-only">Social Link</span>
          </a>
        ))}
      </div>
    </footer>
  )
}

