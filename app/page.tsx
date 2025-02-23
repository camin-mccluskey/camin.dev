import { Hero } from "@/components/hero"
import { WorkSection } from "@/components/work-section"
import { PlaySection } from "@/components/play-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-16">
        <Hero />
        <WorkSection />
        <PlaySection />
        <Footer />
      </div>
    </main>
  )
}

