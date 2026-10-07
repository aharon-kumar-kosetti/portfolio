import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useData } from "../context/DataContext"
import { fetchSocialStats, type SocialStats } from "../lib/stats"
import { GitHubIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./social-icons"
import { Reveal, SectionHeading } from "./ui"

// Current counts supplied by Aharon. Platform API values take precedence when available.
const CURRENT_COUNTS = {
  instagramFollowers: 624,
  youtubeViews: 2353,
}

function useLiveStats(): SocialStats {
  const [stats, setStats] = useState<SocialStats>({
    githubFollowers: null,
    instagramFollowers: null,
    youtubeViews: null,
  })

  useEffect(() => {
    let alive = true

    const load = async () => {
      const latest = await fetchSocialStats()
      if (!alive) return
      setStats(latest ?? { githubFollowers: null, instagramFollowers: null, youtubeViews: null })
    }

    load()
    const id = setInterval(load, 5 * 60 * 1000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  return stats
}

function LiveDot({ live }: { live: boolean }) {
  return (
    <span
      title={live ? "Live platform count; refreshes about every 5 minutes" : "Manually updated count; configure platform API access for automatic updates"}
      className={`ml-2 inline-block h-2 w-2 rounded-full align-middle ${live ? "bg-emerald-500" : "bg-warm-deep/60"}`}
    />
  )
}

export default function Channels() {
  const { profile } = useData()
  const stats = useLiveStats()

  const channels = [
    {
      name: "GitHub",
      value: stats.githubFollowers?.toLocaleString() ?? "—",
      label: "Followers",
      available: stats.githubFollowers != null,
      handle: "@aharon-kumar-kosetti",
      href: profile.github,
      icon: GitHubIcon,
      iconColor: "text-fg",
      chipColor: "bg-warm",
    },
    {
      name: "Instagram",
      value: (stats.instagramFollowers ?? CURRENT_COUNTS.instagramFollowers).toLocaleString(),
      label: "Followers",
      live: stats.instagramFollowers != null,
      handle: "@theaharonkosetti",
      href: profile.instagram,
      icon: InstagramIcon,
      iconColor: "text-[#c13584]",
      chipColor: "bg-[#c13584]/10",
    },
    {
      name: "YouTube",
      value: (stats.youtubeViews ?? CURRENT_COUNTS.youtubeViews).toLocaleString(),
      label: "Total views",
      live: stats.youtubeViews != null,
      handle: "@AharonKosetti",
      href: profile.youtube,
      icon: YouTubeIcon,
      iconColor: "text-[#ff0000]",
      chipColor: "bg-[#ff0000]/10",
    },
    {
      name: "LinkedIn",
      value: "Let's connect",
      label: "Internships & collaborations",
      live: false,
      handle: "in/aharon-kumar-kosetti",
      href: profile.linkedin,
      icon: LinkedInIcon,
      iconColor: "text-[#0a66c2]",
      chipColor: "bg-[#0a66c2]/10",
    },
  ]

  return (
    <section id="channels" className="relative overflow-hidden">
      <div className="dotgrid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <SectionHeading
          eyebrow="Content & Community"
          title="Everywhere I create."
          sub="Code on GitHub, lessons on Instagram and YouTube, professional updates on LinkedIn — pick your channel."
        />

        {/* Avatar — the section centerpiece */}
        <Reveal className="relative mx-auto mb-14 flex w-fit flex-col items-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full border-2 border-dashed border-warm-deep/70 animate-spin-slow"
            />
            <div
              style={{ "--tilt": "0deg" } as React.CSSProperties}
              className="float-card animate-float rounded-full bg-card p-1.5 card-shadow-lg"
            >
              <img
                src="/aharon-kumar-kosetti-portrait.png"
                alt={profile.name}
                width={148}
                height={148}
                className="h-[148px] w-[148px] rounded-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-warm card-shadow">
              AK
            </span>
          </div>
          <div className="mt-6 text-center">
            <div className="font-display text-lg font-bold">Aharon Kosetti</div>
            <div className="font-mono text-xs text-muted">@theaharonkosetti · everywhere</div>
          </div>
        </Reveal>

        {/* Channel stat cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-card p-6 card-shadow transition-all duration-500 hover:-translate-y-1.5 hover:card-shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.chipColor}`}>
                    <c.icon size={22} className={c.iconColor} />
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </div>
                <div className="mt-5 font-display text-xl font-bold tracking-tight text-balance">
                  {c.value}
                  {c.live !== undefined && <LiveDot live={c.live} />}
                </div>
                <div className="mt-0.5 text-sm text-muted">{c.label}</div>
                <div className="mt-4 border-t border-line pt-3 font-mono text-xs text-muted">
                  {c.handle}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
