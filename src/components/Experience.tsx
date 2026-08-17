import { Briefcase, GraduationCap } from "lucide-react"
import { experience } from "../data"
import { Reveal, SectionHeading } from "./ui"

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-warm/40">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <SectionHeading eyebrow="Journey" title="Experience & Education" />
        <div className="relative ml-3 space-y-8 border-l-2 border-warm-deep/50 pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.1}>
              <div className="relative">
                <span
                  className={`absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-xl card-shadow ${
                    e.current ? "bg-ink" : "bg-card"
                  }`}
                >
                  {e.role.includes("Intern") ? (
                    <Briefcase size={14} className={e.current ? "text-white" : "text-accent"} />
                  ) : (
                    <GraduationCap size={14} className="text-accent" />
                  )}
                </span>
                <div className="rounded-2xl bg-card p-6 card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-bold">{e.role}</h3>
                    <span className="rounded-full bg-warm px-3 py-1 font-mono text-xs text-muted">
                      {e.period}
                    </span>
                  </div>
                  <div className="mt-1 font-display text-sm font-medium text-accent">
                    {e.company}
                  </div>
                  <ul className="mt-4 space-y-2 text-muted">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm leading-relaxed">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-warm-deep" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
