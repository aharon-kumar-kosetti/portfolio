const V = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons"

const tech = [
  { name: "React", icon: `${V}/react/react-original.svg` },
  { name: "TypeScript", icon: `${V}/typescript/typescript-original.svg` },
  { name: "JavaScript", icon: `${V}/javascript/javascript-original.svg` },
  { name: "Node.js", icon: `${V}/nodejs/nodejs-original.svg` },
  { name: "Next.js", icon: `${V}/nextjs/nextjs-original.svg` },
  { name: "PostgreSQL", icon: `${V}/postgresql/postgresql-original.svg` },
  { name: "Tailwind CSS", icon: `${V}/tailwindcss/tailwindcss-original.svg` },
  { name: "NestJS", icon: `${V}/nestjs/nestjs-original.svg` },
  { name: "Java", icon: `${V}/java/java-original.svg` },
  { name: "Python", icon: `${V}/python/python-original.svg` },
  { name: "Vite", icon: `${V}/vitejs/vitejs-original.svg` },
  { name: "Git", icon: `${V}/git/git-original.svg` },
]

function Item({ name, icon }: { name: string; icon: string }) {
  return (
    <span className="mx-3 inline-flex shrink-0 items-center gap-3 rounded-2xl bg-card px-5 py-2.5 card-shadow">
      <img src={icon} alt={name} width={24} height={24} loading="lazy" className="h-6 w-6" />
      <span className="font-display text-sm font-medium text-muted">{name}</span>
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-line bg-surface/70 py-5 backdrop-blur-sm">
      <div className="marquee-track flex w-max animate-marquee">
        {[...tech, ...tech].map((t, i) => (
          <Item key={i} {...t} />
        ))}
      </div>
      {/* edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent" />
    </div>
  )
}
