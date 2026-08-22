import { useData } from "../context/DataContext"
import { GitHubIcon, InstagramIcon, LeetCodeIcon, LinkedInIcon, YouTubeIcon } from "./social-icons"

export default function Footer() {
  const { profile } = useData()

  const socials = [
    { label: "GitHub", href: profile.github, Icon: GitHubIcon, color: "text-fg" },
    { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon, color: "text-[#0a66c2]" },
    { label: "Instagram", href: profile.instagram, Icon: InstagramIcon, color: "text-[#c13584]" },
    { label: "YouTube", href: profile.youtube, Icon: YouTubeIcon, color: "text-[#ff0000]" },
    { label: "LeetCode", href: profile.leetcode, Icon: LeetCodeIcon, color: "text-fg" },
  ]

  return (
    <footer className="border-t border-line bg-warm/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10">
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-lg"
            >
              <s.Icon size={18} className={s.color} />
            </a>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-3 font-mono text-sm text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            Built with <span className="text-accent">React</span> ·{" "}
            <span className="text-accent">Tailwind</span> ·{" "}
            <span className="text-accent">Framer Motion</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
