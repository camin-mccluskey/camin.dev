import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

export function Hero() {
  return (
    <header className="space-y-2 py-16">
      <h1 className="font-bold text-lg">Camin McCluskey</h1>
      <div className="">
        <p>Technologist and founder.</p>
        <p>CTO at <a href="https://www.stackfix.com" className="link">Stackfix</a>.</p>
        <p>Writing and tinkering, here and elsewhere.</p>
      </div>
      <ul className="space-y-1 pt-4">
        <li className="flex items-center gap-3">
          <TwitterIcon size={16} />
          <a href="https://x.com/caminmc">
            @caminmc
          </a>
        </li>
        <li className="flex items-center gap-3">
          <LinkedinIcon size={16} />
          <a href="https://www.linkedin.com/in/camin-mccluskey/">
            camin-mccluskey
          </a>
        </li>
        <li className="flex items-center gap-3">
          <GithubIcon size={16} />
          <a href="https://github.com/camin-mccluskey">
            @camin_mccluskey
          </a>
        </li>
      </ul>
    </header>
  )
}

