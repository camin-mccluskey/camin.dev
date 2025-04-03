import { ThemeSwitcher } from "./theme-switcher";
import { HomeLink } from "./home-link";

export function Header() {
  return (
    <nav className="w-svw absolute left-0 flex items-center justify-end py-2 px-8">
      <HomeLink />
      <ThemeSwitcher />
    </nav>
  )
}
