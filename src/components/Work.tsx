import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { ArrowUpRight, GitFork, Star } from "lucide-react"
import type { MouseEvent } from "react"
import { projects } from "../data"
import { Reveal, SectionHeading, Tag } from "./ui"

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const bg = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(201,188,174,0.22), transparent 70%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  const onLeave = () => {
    mx.set(-300)
    my.set(-300)
  }

  return (
    <Reveal delay={i * 0.08} className={p.span}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-7 card-shadow transition-shadow duration-500 hover:card-shadow-lg"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            {p.badge && (
              <span
                style={{ "--tilt": "-2deg" } as React.CSSProperties}
                className="mb-3 inline-block rotate-[-2deg] rounded-lg bg-warm px-3 py-1 font-display text-xs font-bold text-fg"
              >
                {p.badge}
              </span>
            )}
            <h3 className="font-display text-2xl font-bold tracking-tight">{p.name}</h3>
          </div>
          <div className="flex items-center gap-3 font-display text-xs font-medium text-muted">
            {p.stars > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star size={13} className="fill-accent text-accent" /> {p.stars}
              </span>
            )}
            {p.forks > 0 && (
              <span className="inline-flex items-center gap-1">
                <GitFork size={13} /> {p.forks}
              </span>
            )}
          </div>
        </div>

        <p className="relative mt-4 text-[15px] leading-relaxed text-muted">{p.description}</p>

        {p.points.length > 0 && (
          <ul className="relative mt-4 space-y-2 text-sm text-muted">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-warm-deep" />
                {pt}
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-5">
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-display text-sm font-medium transition-colors hover:text-accent"
            >
              Code <ArrowUpRight size={14} />
            </a>
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-display text-sm font-medium transition-colors hover:text-accent"
              >
                Live demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

export default function Work() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Selected Work"
        title="Products built to win, and to last."
        sub="From 24-hour hackathon sprints to production features — every project solves a real problem end to end."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
        {rest.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i + featured.length} />
        ))}
        <Reveal delay={0.2}>
          <a
            href="https://github.com/aharon-kumar-kosetti?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group flex h-full min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-warm-deep/60 p-7 text-muted card-shadow-none transition-all duration-500 hover:border-ink/40 hover:text-fg"
          >
            <span className="font-display text-xl font-bold">View all repositories</span>
            <span className="inline-flex items-center gap-1.5 font-display text-sm font-medium">
              18 public repos on GitHub
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
