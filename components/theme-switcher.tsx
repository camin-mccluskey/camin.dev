'use client'

import { useTheme } from "next-themes"
import { Toggle } from "./ui/toggle"
import { SunMoon } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Toggle aria-label="theme-toggle" pressed={isDark} onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}>
      <SunMoon />
    </Toggle>
  )
}
