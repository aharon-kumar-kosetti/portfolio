import { ArrowUpRight, Check, Copy } from "lucide-react"
import { useState } from "react"
import { profile } from "../data"
import { GitHubIcon, InstagramIcon, LeetCodeIcon, LinkedInIcon, YouTubeIcon } from "./social-icons"
import { Eyebrow, PillButton, Reveal } from "./ui"

const links = [
  { label: "GitHub", href: profile.github, handle: "@aharon-kumar-kosetti", Icon: GitHubIcon, color: "text-fg" },
  { label: "LinkedIn", href: profile.linkedin, handle: "in/aharon-kumar-kosetti", Icon: LinkedInIcon, color: "text-[#0a66c2]" },
  { label: "Instagram", href: profile.instagram, handle: "@theaharonkosetti", Icon: InstagramIcon, color: "text-[#c13584]" },
  { label: "YouTube", href: profile.youtube, handle: "@AharonKosetti", Icon: YouTubeIcon, color: "text-[#ff0000]" },
  { label: "LeetCode", href: profile.leetcode, handle: "aharonkosetti", Icon: LeetCodeIcon, color: "text-fg" },
  { label: "Résumé", href: profile.resume, handle: "Aharon Kosetti Resume.pdf", Icon: null, color: "" },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>What's next?</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-black tracking-tight text-balance md:text-6xl md:leading-[1.05]">
            Let's build something worth shipping.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I'm open to internships, collaborations, and interesting problems.
            Whether it's a full-stack product or an AI-driven feature — my inbox
            is always open.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PillButton href={`mailto:${profile.email}`}>Say hello</PillButton>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-3 font-mono text-sm text-muted transition-all duration-300 hover:border-ink/40 hover:text-fg card-shadow"
            >
              {profile.email}
              {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-card p-5 card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg"
            >
              <div className="flex items-center gap-3">
                {l.Icon && (
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm">
                    <l.Icon size={17} className={l.color} />
                  </span>
                )}
                <div>
                  <div className="font-display font-bold">{l.label}</div>
                  <div className="font-mono text-xs text-muted">{l.handle}</div>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
