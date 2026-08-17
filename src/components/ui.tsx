import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef, type ReactNode } from "react"

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 90, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-display text-[13px] font-medium text-muted card-shadow">
      <span className="h-1.5 w-1.5 rounded-full bg-warm-deep" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: string
  sub?: string
}) {
  return (
    <Reveal className="mb-14 flex flex-col items-center text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-[44px] md:leading-[1.1]">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{sub}</p>}
    </Reveal>
  )
}

/* Black pill button with icon chip — the CodeDale signature CTA */
export function PillButton({
  href,
  children,
  target,
}: {
  href: string
  children: ReactNode
  target?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-display text-sm font-medium text-white btn-shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(23,24,28,0.5)]"
    >
      {children}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white/25">
        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

export function GhostButton({
  href,
  children,
  target,
}: {
  href: string
  children: ReactNode
  target?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-surface py-2 pl-6 pr-2 font-display text-sm font-medium text-fg card-shadow transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30"
    >
      {children}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warm transition-colors duration-300 group-hover:bg-warm-deep">
        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-warm/60 px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 hover:border-ink/30 hover:text-fg">
      {children}
    </span>
  )
}
