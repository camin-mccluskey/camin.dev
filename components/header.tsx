import { ThemeSwitcher } from "./theme-switcher";

export function Header() {
  return (
    <nav className="w-svw absolute left-0 flex items-center justify-end p-2">
      <ThemeSwitcher />
    </nav>
  )
}
