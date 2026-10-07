export type SocialStats = {
  githubFollowers: number | null
  instagramFollowers: number | null
  youtubeViews: number | null
}

/** Reads public counts from the site's same-origin Vercel Function. */
export async function fetchSocialStats(): Promise<SocialStats | null> {
  try {
    const response = await fetch("/api/social-stats", { cache: "no-store" })
    if (!response.ok) return null
    const data = await response.json()
    return {
      githubFollowers: Number.isFinite(data.githubFollowers) ? data.githubFollowers : null,
      instagramFollowers: Number.isFinite(data.instagramFollowers) ? data.instagramFollowers : null,
      youtubeViews: Number.isFinite(data.youtubeViews) ? data.youtubeViews : null,
    }
  } catch {
    return null
  }
}
