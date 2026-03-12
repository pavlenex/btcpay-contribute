# contribute.btcpayserver.org

A unified landing page that surfaces all **good first issues** across the BTCPay Server GitHub organization, filtered by contributor skill — developer, writer, designer, or marketer.

**Live:** https://contribute.btcpayserver.org

---

## How it works

1. A GitHub Actions workflow runs every 6 hours (and on manual trigger)
2. It fetches all `good first issue` labeled issues from every public repo in the `btcpayserver` org
3. Issues are mapped to skill categories and sub-tags based on repo language and labels
4. The data is written to `public/data/issues.json` and the site is rebuilt and deployed to GitHub Pages

The site is fully static — no backend, no API calls from the browser.

## Local development

```bash
git clone https://github.com/btcpayserver/contribute.btcpayserver.org
cd contribute.btcpayserver.org
npm install
npm run dev
```

The dev server uses the seed data in `public/data/issues.json`. To fetch live data:

```bash
ORG_GITHUB_TOKEN=ghp_your_token node scripts/fetch-issues.js
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Stack

- React 19 + TypeScript (strict)
- Vite 6 + Tailwind CSS 4
- Radix UI (Dialog), Lucide React
- GitHub Actions for data pipeline and deployment

## Deployment

GitHub Pages via `actions/deploy-pages`. Source: `main` branch.
Pages source must be set to **GitHub Actions** in repo Settings → Pages.

Required secret: `ORG_GITHUB_TOKEN` — a PAT with `repo:read` scope to query cross-repo issues.
