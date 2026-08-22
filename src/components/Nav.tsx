import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useData } from "../context/DataContext"

export default function Nav() {
  const { nav, profile } = useData()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-base/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-black tracking-tight">
          aharon<span className="text-warm-deep">.dev</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative font-display text-sm font-medium text-muted hover:text-fg transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-5 py-2 font-display text-sm font-medium text-white btn-shadow transition-all duration-300 hover:-translate-y-0.5"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-muted hover:text-fg"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-line bg-base/95 backdrop-blur-xl"
          >
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 font-display text-sm font-medium text-muted hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="block px-6 py-3 font-display text-sm font-medium text-fg"
              >
                Résumé
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
