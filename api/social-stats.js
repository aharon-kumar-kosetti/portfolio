const cacheControl = "public, s-maxage=300, stale-while-revalidate=60"

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!response.ok) throw new Error(`Upstream returned ${response.status}`)
  return response.json()
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET")
    return response.status(405).json({ error: "Method not allowed" })
  }

  const stats = {
    githubFollowers: null,
    instagramFollowers: null,
    youtubeViews: null,
  }

  const requests = [
    getJson("https://api.github.com/users/aharon-kumar-kosetti")
      .then((data) => { stats.githubFollowers = Number.isFinite(data.followers) ? data.followers : null })
      .catch(() => {}),
  ]

  if (process.env.YOUTUBE_API_KEY) {
    const url = new URL("https://www.googleapis.com/youtube/v3/channels")
    url.search = new URLSearchParams({
      part: "statistics",
      forHandle: "@AharonKosetti",
      key: process.env.YOUTUBE_API_KEY,
    }).toString()
    requests.push(
      getJson(url).then((data) => {
        const views = Number(data.items?.[0]?.statistics?.viewCount)
        stats.youtubeViews = Number.isFinite(views) ? views : null
      }).catch(() => {}),
    )
  }

  if (process.env.INSTAGRAM_GRAPH_USER_ID && process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN && process.env.INSTAGRAM_GRAPH_API_VERSION) {
    const url = new URL(`https://graph.facebook.com/${process.env.INSTAGRAM_GRAPH_API_VERSION}/${process.env.INSTAGRAM_GRAPH_USER_ID}`)
    url.search = new URLSearchParams({
      fields: "followers_count",
      access_token: process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN,
    }).toString()
    requests.push(
      getJson(url).then((data) => {
        stats.instagramFollowers = Number.isFinite(data.followers_count) ? data.followers_count : null
      }).catch(() => {}),
    )
  }

  await Promise.all(requests)
  response.setHeader("Cache-Control", cacheControl)
  return response.status(200).json(stats)
}
