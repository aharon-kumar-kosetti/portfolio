import { skills } from "../data"
import { Reveal, SectionHeading, Tag } from "./ui"

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools I reach for."
        sub="A stack chosen for shipping speed and reliability — the same one I use at work and in hackathons."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.07}>
            <div className="group h-full rounded-2xl bg-card p-6 card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{group}</h3>
                <span className="font-mono text-xs text-warm-deep">0{i + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.35}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-ink p-6 text-white">
            <div>
              <h3 className="font-display text-lg font-bold">Currently learning</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                System design patterns, advanced PostgreSQL, and agentic LLM orchestration —
                applied daily at work and in side projects.
              </p>
            </div>
            <a
              href="https://leetcode.com/u/aharonkosetti/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-warm-deep hover:underline"
            >
              leetcode.com/u/aharonkosetti →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
