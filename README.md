# Andrés Israel Umaña Sedó — Digital Work

Bilingual personal portfolio for Andrés Israel Umaña Sedó. It presents a single journey for prospective clients and recruiters: selected work, technical range, professional background, and direct contact.

The site is a static Astro application with TypeScript, Astro Content Collections, Vitest, Playwright, and GitHub Actions. The repository intentionally demonstrates the stack behind the portfolio as well as the work it presents.

## Local setup

```bash
npm ci
npm run dev
```

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run check` | Run Astro and TypeScript diagnostics. |
| `npm run test:run` | Run the unit suite once. |
| `npm run build` | Generate the static `dist/` site. |
| `npm run preview` | Preview the generated site. |
| `npm run test:e2e` | Build and test the static site with Playwright. |

## Content and projects

Project records live in [`src/content/projects.json`](src/content/projects.json) and are validated by [`src/content.config.ts`](src/content.config.ts). Every record has a stable slug, order, year, disciplines, technologies, localized title/summary/challenge/role/solution/alt text, and a live URL when one is appropriate.

Projects marked `caseStudy: true` need localized decisions, outcome, and gallery entries. The current launch set contains seven projects, with long-form cases for Asociación Bancaria Costarricense, Kajual Gastronomía, Estructuras S.A., and Congero Technology Group.

To add a project:

1. Add the project record and both Spanish and English copy.
2. Add an optimized visual asset under `public/images/projects/` and document its source or authorization in that directory’s README.
3. Use meaningful bilingual alternative text; do not use an empty `alt` attribute for portfolio evidence.
4. Run `npm run test:run`, `npm run check`, `npm run build`, and `npm run test:e2e`.

Nauyaca Waterfall Nature Park is the next flagship case study. It may state the client-reported approximate 40% sales increase from the web redesign plus Google Ads, but it must not include confidential Ads data, spend, targeting, reports, or screenshots.

## Images and metadata

Project screenshots are compressed before commit and documented in [`public/images/projects/README.md`](public/images/projects/README.md). The portfolio uses localized alt text, canonical URLs, language alternates, Open Graph, and Twitter card metadata. Images that cannot be captured as representative public pages use explicitly marked typographic covers until approved evidence is available.

## Deployment

Deployment instructions are in [`docs/deployment.md`](docs/deployment.md). The upload target is always supplied outside Git:

```bash
DEPLOY_HOST='host.example' \
DEPLOY_USER='deploy-user' \
DEPLOY_PATH='/absolute/web/root' \
bash scripts/deploy-static.sh
```

The script uses `rsync --delete`, so `DEPLOY_PATH` must be a dedicated portfolio document root. Never commit SSH keys, server addresses, credentials, `.env` files, `node_modules/`, `dist/`, or test artifacts.

Before launch, complete [`docs/release-checklist.md`](docs/release-checklist.md). GitHub Actions runs the type checks, unit tests, build, and browser suite for changes proposed to `main`.
