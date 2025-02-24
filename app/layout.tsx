import type React from "react"
import { IBM_Plex_Mono, Manrope, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

export const metadata = {
  title: "Camin McCluskey",
  description: "[This] art is never finished, only abandoned",
  openGraph: {
    title: "Camin McCluskey",
    images: ['/og'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          manrope.variable,
          playfair.variable,
          ibmPlexMono.variable,
          "min-h-screen bg-background text-foreground antialiased font-sans mx-8 max-w-[980px]",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

