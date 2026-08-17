import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { MapPin, Sparkles, Trophy } from "lucide-react"
import type { MouseEvent } from "react"
import { profile } from "../data"
import Marquee from "./Marquee"
import { GitHubIcon } from "./social-icons"
import { GhostButton, PillButton } from "./ui"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.8, ease: [0.21, 0.65, 0.16, 1] as const },
  }),
}

function FloatCard({
  tilt,
  delay,
  className = "",
  parallax,
  children,
}: {
  tilt: number
  delay: number
  className?: string
  parallax?: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.21, 0.65, 0.16, 1] }}
      className={className}
    >
      <motion.div style={{ y: parallax }}>
        <div
          style={{
            "--tilt": `${tilt}deg`,
            animationDelay: `${(delay * 1.7) % 7}s`,
          } as React.CSSProperties}
          className="float-card animate-float rounded-2xl bg-card p-4 card-shadow"
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.35)
  const sx = useSpring(mx, { stiffness: 50, damping: 22 })
  const sy = useSpring(my, { stiffness: 50, damping: 22 })
  const glowX = useTransform(sx, (v) => `${v * 100}%`)
  const glowY = useTransform(sy, (v) => `${v * 100}%`)

  // Scroll parallax — each card layer drifts at its own rate, Framer-style depth
  const { scrollY } = useScroll()
  const parallaxSlow = useTransform(scrollY, [0, 800], [0, -60])
  const parallaxMid = useTransform(scrollY, [0, 800], [0, -110])
  const parallaxFast = useTransform(scrollY, [0, 800], [0, -170])
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.35])
  const heroLift = useTransform(scrollY, [0, 500], [0, -40])

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="dotgrid absolute inset-0" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          left: glowX,
          top: glowY,
          background: "radial-gradient(circle, #efeadf 0%, transparent 60%)",
        }}
      />

      <motion.div
        style={{ opacity: heroFade, y: heroLift }}
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-display text-[13px] font-medium text-muted card-shadow">
            <Sparkles size={13} className="text-accent" />
            Open to internships & collaborations
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-7 font-display text-[44px] font-black leading-[1.02] tracking-tight text-balance md:text-[76px]"
        >
          Aharon Kumar Kosetti
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-muted"
        >
          Full-stack developer building products that ship — from{" "}
          <span className="text-fg">hackathon-winning</span> health-tech to{" "}
          <span className="text-fg">Agentic AI</span> features at Pynyx.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 flex items-center gap-2 font-display text-sm font-medium text-muted"
        >
          <MapPin size={15} className="text-accent" />
          {profile.location.split(",")[0]}, Andhra Pradesh, India
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton href="#work">View my work</PillButton>
          <GhostButton href={profile.github} target="_blank">
            GitHub
          </GhostButton>
        </motion.div>

        {/* Playful floating collage — the CodeDale hero signature */}
        <div className="relative mt-16 flex w-full flex-wrap items-center justify-center gap-5 md:mt-20 md:gap-8">
          <FloatCard tilt={-6} delay={0.5} parallax={parallaxSlow} className="hidden sm:block">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm">
                <Trophy size={17} className="fill-accent text-accent" />
              </span>
              <div>
                <div className="font-display text-sm font-bold">2nd Place</div>
                <div className="text-xs text-muted">Udhbhav 2k26 · 50+ teams</div>
              </div>
            </div>
          </FloatCard>

          <FloatCard tilt={4} delay={0.65} parallax={parallaxMid}>
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm p-1">
                <img src="/pynyx-logo.png" alt="Pynyx" className="h-full w-full rounded-lg object-contain" />
              </span>
              <div>
                <div className="font-display text-sm font-bold">SDE Intern</div>
                <div className="text-xs text-muted">Pynyx Private Limited</div>
              </div>
            </div>
          </FloatCard>

          <FloatCard tilt={-3} delay={0.8} parallax={parallaxFast} className="hidden sm:block">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm">
                <GitHubIcon size={18} className="text-fg" />
              </span>
              <div>
                <div className="font-display text-sm font-bold">18 Public repos</div>
                <div className="text-xs text-muted">github · aharon-kumar-kosetti</div>
              </div>
            </div>
          </FloatCard>

          <FloatCard tilt={7} delay={0.95} parallax={parallaxSlow} className="hidden md:block">
            <div className="rounded-xl bg-ink px-4 py-2.5 font-mono text-xs text-white">
              gpt-4o → medical summary ✓
            </div>
          </FloatCard>
        </div>
      </motion.div>

      <Marquee />
    </section>
  )
}
