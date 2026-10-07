# Aharon Kumar Kosetti — Portfolio

Modern, high-performance portfolio website built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Linter**: Oxlint
- **Deployment**: Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm / yarn / pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 🌐 Deployment to Vercel

This repository is pre-configured for Vercel deployment with `vercel.json` rewrite routing. Simply import this repository in [Vercel](https://vercel.com) and deploy with the default Vite preset:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

# Social counts

The Channels section reads counts from `/api/social-stats`. GitHub followers are fetched from GitHub's public user endpoint. The Instagram (624 followers) and YouTube (2,353 views) counts are manually supplied current values until their official API credentials are configured; API values take precedence when available. Results are cached at the edge for five minutes.

Add these as **server-side environment variables** in Vercel (Project → Settings → Environment Variables), then redeploy:

- `YOUTUBE_API_KEY` — a Google API key with YouTube Data API v3 enabled.
- `INSTAGRAM_GRAPH_USER_ID` — the Instagram Professional account ID.
- `INSTAGRAM_GRAPH_ACCESS_TOKEN` — an access token authorized for that Professional account.
- `INSTAGRAM_GRAPH_API_VERSION` — a supported Meta Graph API version, such as `vXX.X` from your Meta app setup.

Do not prefix these variables with `VITE_` and do not commit the credentials. Instagram's official follower-count API requires an eligible Professional (Creator or Business) account and valid permissions/token.
