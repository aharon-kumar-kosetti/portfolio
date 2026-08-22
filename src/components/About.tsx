import { Award, Code2, Trophy } from "lucide-react"
import { useData } from "../context/DataContext"
import { Reveal, SectionHeading } from "./ui"

const stats = [
  { icon: Trophy, value: "2nd", label: "Place — Udhbhav 2k26 (50+ teams)" },
  { icon: Code2, value: "18", label: "Public repositories" },
  { icon: Award, value: "3", label: "Hackathons & counting" },
]

export default function About() {
  const { profile } = useData()
  return (
    <section id="about" className="border-t border-line bg-warm/40">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <SectionHeading
          eyebrow="About Me"
          title="Student by roll number, engineer by commit count."
        />
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="space-y-5 rounded-2xl bg-card p-8 text-[15px] leading-relaxed text-muted card-shadow">
              <p>
                I'm a Computer Science &amp; Design undergraduate at{" "}
                <span className="font-semibold text-fg">SRKR Engineering College</span> and a
                Software Development Engineer intern at{" "}
                <span className="font-semibold text-fg">Pynyx Private Limited</span>, where I
                build full-stack applications and AI-powered features with LLMs and Agentic AI
                workflows.
              </p>
              <p>
                My happy place is the intersection of product and engineering — hackathons like{" "}
                <span className="font-semibold text-fg">MediVault</span> (2nd place, Udhbhav
                2k26) and <span className="font-semibold text-fg">Blood Link</span> taught me
                to ship working software under real deadlines, with secure auth, role-based
                access, and data models that put users first.
              </p>
              <p>
                Right now I'm deepening my craft in system design, testing with Vitest, and
                CI/CD — and grinding DSA daily for that future SDE role.
              </p>
              <div className="pt-2">
                <div className="font-display text-sm font-bold">Reach me at</div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm text-accent hover:underline break-all"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="flex items-center gap-5 rounded-2xl bg-card p-5 card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg">
                  <s.icon size={26} className="shrink-0 text-accent" strokeWidth={1.8} />
                  <div>
                    <div className="font-display text-2xl font-black">{s.value}</div>
                    <div className="text-sm text-muted">{s.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div
                style={{ "--tilt": "-1.5deg" } as React.CSSProperties}
                className="rotate-[-1.5deg] rounded-2xl bg-ink p-5 font-mono text-sm text-white/90"
              >
                $ git commit -m "ship it" 🚀
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
