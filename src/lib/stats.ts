/* Live platform stats — fetched in the browser with graceful fallbacks.
   - GitHub: open CORS API (github-contributions-api.jogruber.de) → always live
   - YouTube / Instagram: page fetch via public CORS proxy chain → live when any proxy is up
   - LinkedIn: blocks anonymous reads entirely → static value only */

const PROXIES: Array<(u: string) => string> = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
]

async function fetchViaProxies(url: string, timeoutMs = 9000): Promise<string | null> {
  for (const make of PROXIES) {
    try {
      const res = await fetch(make(url), { signal: AbortSignal.timeout(timeoutMs) })
      if (!res.ok) continue
      const text = await res.text()
      if (text && text.length > 500) return text
    } catch {
      /* try next proxy */
    }
  }
  return null
}

const parseNum = (s: string) => Number(s.replace(/,/g, "").replace(/\./g, ""))

export async function fetchGithubCommits(user: string): Promise<number | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}`)
    if (!res.ok) return null
    const data = await res.json()
    const total = Object.values<number>(data?.total ?? {}).reduce((a, b) => a + b, 0)
    return total > 0 ? total : null
  } catch {
    return null
  }
}

export async function fetchYoutubeViews(handle: string): Promise<number | null> {
  const html = await fetchViaProxies(`https://www.youtube.com/${handle}/about`)
  if (!html) return null
  const m = html.match(/([0-9][0-9,.]*)\s*views\b/i)
  return m ? parseNum(m[1]) : null
}

export async function fetchInstagramFollowers(username: string): Promise<number | null> {
  const html = await fetchViaProxies(`https://www.instagram.com/${username}/`)
  if (!html) return null
  const m =
    html.match(/edge_followed_by":\{"count":([0-9]+)/) ||
    html.match(/([0-9][0-9,.]*)[KM]?\s*Followers/i) ||
    html.match(/content="([0-9][0-9.,]*)[KM]?\s*Follower/i)
  return m ? parseNum(m[1]) : null
}
