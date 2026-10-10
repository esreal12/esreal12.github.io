# Digital Work Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a fast, bilingual personal portfolio for Andrés Israel Umaña Sedó that presents seven selected projects through one coherent project-first journey.

**Architecture:** Build a static Astro 5 application with typed, local project content and explicit `/es/` and `/en/` routes. Shared layout and presentation components consume a small locale utility and validated project records; static dynamic routes produce individual project pages at build time. Deployment remains static and server-portable, with a reviewed SSH/rsync command and a reverse-proxy configuration selected only after inspecting the existing server.

**Tech Stack:** Astro 5, TypeScript strict mode, Astro Content Layer with Zod, CSS custom properties, Vitest, Playwright, npm, static deployment over SSH/rsync.

**Spec:** `docs/superpowers/specs/2026-10-10-digital-work-hub-design.md`

## Global Constraints

- Use Spanish and English from the first release, with explicit `/es/` and `/en/` URLs; never use a machine-translation fallback.
- Keep a single visitor journey. Do not create separate client and recruiter funnels or CTAs.
- Use the approved personal name, **Andrés Israel Umaña Sedó — Digital Work**. Do not present the site as a Solución Digital marketing site.
- Ship seven projects: ABC, Kajual, Estructuras S.A., Congero Technology Group, Biophilia Park, Raindrop Spa, and Francisco Saco.
- The four featured projects render as full case studies; the other three initially render as short profiles using the same data shape.
- Do not expose non-public client data, credentials, campaign configuration, budgets, targeting, internal analytics, or AWS infrastructure details.
- Public or authorized imagery only. All images require meaningful `alt` text in both locales and responsive dimensions.
- Credit collaborators accurately, including external Figma design work where applicable.
- Preserve keyboard access, visible focus, WCAG AA contrast, and `prefers-reduced-motion` support.
- Keep the initial release static: no CMS, database, authentication, newsletter, or contact-form backend.
- Keep credentials and server-specific values out of Git. `main` remains deployable and tracks `origin/main`.

## Review Focus

- **Missing translation:** a project that has only one locale must fail content validation rather than silently display the other language; covered in Task 2.
- **Unknown or malicious route segment:** a nonexistent project slug and a slug containing path separators must render the bilingual 404 recovery response rather than an error page or another project; covered in Task 6.
- **Locale preservation:** changing language on an existing case must lead to that case in the other locale, while a route without an equivalent must lead to the target-language homepage; covered in Task 3.
- **Unavailable live site:** a portfolio entry with `liveUrl: null` must remain visible with no broken external anchor; covered in Task 5.
- **No-JavaScript and reduced-motion visitors:** navigation, content, focus, and animation-reduction behavior must work without client JavaScript; covered in Tasks 4 and 9.

---

## File Structure

```text
.
├── .github/workflows/verify.yml                 # CI build and test checks
├── public/
│   ├── favicon.svg                              # Personal portfolio favicon
│   ├── robots.txt                               # Crawl policy
│   ├── images/projects/                         # Public/authorized optimized source images
│   └── social/default-og.jpg                    # Default social-card image
├── scripts/deploy-static.sh                     # Explicit SSH/rsync deployment command
├── src/
│   ├── components/
│   │   ├── CaseStudy.astro                      # Full project narrative presentation
│   │   ├── ContactLinks.astro                   # Schedule, email, and LinkedIn links
│   │   ├── LanguageSwitcher.astro               # Locale-preserving language control
│   │   ├── ProjectCard.astro                    # Collection/featured project card
│   │   ├── ProjectGallery.astro                 # Accessible responsive project imagery
│   │   ├── SiteFooter.astro                     # Shared footer and social links
│   │   └── SiteHeader.astro                     # Shared primary navigation
│   ├── content/projects.json                    # Seven validated bilingual project records
│   ├── content.config.ts                        # Content Layer loader and Zod schema
│   ├── data/profile.ts                          # Non-project bilingual personal/profile copy
│   ├── layouts/BaseLayout.astro                 # HTML head, alternates, header, footer
│   ├── lib/
│   │   ├── locale.ts                            # Locale parsing and localized URL functions
│   │   ├── projects.ts                          # Collection ordering and project lookup functions
│   │   └── seo.ts                               # Page title/description/canonical builders
│   ├── pages/
│   │   ├── index.astro                          # Root redirect to default localized homepage
│   │   ├── 404.astro                            # Bilingual static recovery page
│   │   └── [locale]/
│   │       ├── index.astro                      # Homepage
│   │       ├── about.astro                      # Professional story
│   │       ├── contact.astro                    # Direct contact choices
│   │       └── work/
│   │           ├── index.astro                  # Complete project collection
│   │           └── [slug].astro                 # Static project/case-study routes
│   └── styles/global.css                         # Tokens, reset, responsive and a11y styles
├── tests/
│   ├── content-schema.test.ts                   # Project record validation
│   ├── locale.test.ts                           # URL and language-switch behavior
│   ├── project-links.test.ts                    # Available/unavailable live-link behavior
│   ├── projects.test.ts                         # Ordering and lookup behavior
│   ├── release-checklist.test.ts                # Launch-checklist completeness
│   └── e2e/portfolio.spec.ts                    # Built-site locale, navigation, and a11y smoke tests
├── astro.config.mjs                             # Static output, site URL, i18n configuration
├── package.json                                 # Commands and pinned direct dependencies
├── playwright.config.ts                         # Local static-server E2E configuration
├── tsconfig.json                                # Astro strict TypeScript configuration
└── vitest.config.ts                             # Vite-compatible Vitest configuration
```

## Task 1: Create the static Astro foundation and verification commands

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.gitignore`
- Create: `.github/workflows/verify.yml`
- Create: `tests/smoke.test.ts`

**Interfaces:**
- Consumes: Node.js LTS and npm.
- Produces: `npm run test`, `npm run build`, `npm run check`, and `npm run test:e2e` commands used by all later tasks and CI.

- [ ] **Step 1: Write the failing smoke test**

```ts
// tests/smoke.test.ts
import { expect, test } from 'vitest';

test('the test runner is configured', () => {
  expect(import.meta.env.MODE).toBe('test');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- --run tests/smoke.test.ts`

Expected: FAIL because no `package.json` script or Vitest configuration exists.

- [ ] **Step 3: Scaffold Astro and add explicit project configuration**

Create the project with Astro 5 and TypeScript strict mode. Set `output: 'static'`, `site: 'https://work.soluciondigital.cr'`, `trailingSlash: 'always'`, and an i18n configuration with `locales: ['es', 'en']`, `defaultLocale: 'es'`, and `prefixDefaultLocale: true`. Add scripts exactly as follows:

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Configure Vitest using `getViteConfig()` from `astro/config`; configure Playwright to run `npm run preview -- --host 127.0.0.1 --port 4321` after a successful build. Ignore `node_modules/`, `dist/`, `.astro/`, `playwright-report/`, and `test-results/`. Make the GitHub workflow run `npm ci`, `npm run check`, `npm run test:run`, and `npm run build` on pushes and pull requests to `main`.

- [ ] **Step 4: Run the foundation checks**

Run: `npm run test:run && npm run check && npm run build`

Expected: all commands exit `0` and `dist/` is generated.

- [ ] **Step 5: Commit the foundation**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts playwright.config.ts .gitignore .github/workflows/verify.yml tests/smoke.test.ts
git commit -m "chore: scaffold Astro portfolio foundation"
```

## Task 2: Add typed bilingual project content and query helpers

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects.json`
- Create: `src/lib/projects.ts`
- Create: `tests/content-schema.test.ts`
- Create: `tests/projects.test.ts`

**Interfaces:**
- Consumes: Astro Content Layer and project records from `src/content/projects.json`.
- Produces: `ProjectRecord`, `getOrderedProjects()`, `getProjectBySlug(slug)`, and `getFeaturedProjects()` for pages and components.

- [ ] **Step 1: Write failing schema and ordering tests**

```ts
import { expect, test } from 'vitest';
import { projectSchema } from '../src/content.config';
import { getOrderedProjects } from '../src/lib/projects';

test('rejects a project missing an English translation', () => {
  expect(() => projectSchema.parse({ slug: 'x', translations: { es: {} } })).toThrow();
});

test('orders records by ascending order field', () => {
  expect(getOrderedProjects([{ order: 2 }, { order: 1 }] as never).map((item) => item.order)).toEqual([1, 2]);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- --run tests/content-schema.test.ts tests/projects.test.ts`

Expected: FAIL because schema and helper exports do not exist.

- [ ] **Step 3: Implement the content contract and seven records**

Export a Zod `projectSchema` from `src/content.config.ts`. Require: `slug`, `order`, `featured`, `caseStudy`, `year`, `disciplines`, `technologies`, `image`, nullable `liveUrl`, and `translations.es` plus `translations.en`. Each translation must require `title`, `summary`, `challenge`, `role`, `solution`, `alt`, and `unavailableLinkLabel`; full cases additionally require `decisions`, `outcome`, and `gallery`.

Load `projects.json` through Astro's `file()` loader and register it as `projects`. Add bilingual records for exactly these slugs: `asociacion-bancaria-costarricense`, `kajual-gastronomia`, `estructuras-sa`, `congero-technology-group`, `biophilia-park`, `raindrop-spa`, and `francisco-saco`. Mark the first four as `caseStudy: true` and the same four as `featured: true`. Keep all results factual: do not fabricate metrics or describe campaign internals.

In `src/lib/projects.ts`, implement pure helpers with these signatures:

```ts
export type ProjectRecord = CollectionEntry<'projects'>['data'];
export function getOrderedProjects(projects: ProjectRecord[]): ProjectRecord[];
export function getFeaturedProjects(projects: ProjectRecord[]): ProjectRecord[];
export function getProjectBySlug(projects: ProjectRecord[], slug: string): ProjectRecord | undefined;
```

All ordering must sort a copy, never mutate the supplied array.

- [ ] **Step 4: Run content and helper tests**

Run: `npm run test:run -- tests/content-schema.test.ts tests/projects.test.ts && npm run check`

Expected: PASS; malformed content is rejected, seven records validate, ordering is deterministic, and unknown slugs return `undefined`.

- [ ] **Step 5: Commit typed content**

```bash
git add src/content.config.ts src/content/projects.json src/lib/projects.ts tests/content-schema.test.ts tests/projects.test.ts
git commit -m "feat: add bilingual project content model"
```

## Task 3: Implement locale-safe route and language-switch helpers

**Files:**
- Create: `src/lib/locale.ts`
- Create: `tests/locale.test.ts`

**Interfaces:**
- Consumes: `Locale = 'es' | 'en'`, route pathnames, and known project slugs.
- Produces: `isLocale(value)`, `localizedPath(locale, path)`, and `switchLocalePath(currentPath, targetLocale, knownSlugs)` for layouts and switcher UI.

- [ ] **Step 1: Write failing locale tests**

```ts
import { expect, test } from 'vitest';
import { switchLocalePath } from '../src/lib/locale';

test('preserves a known project slug when switching locales', () => {
  expect(switchLocalePath('/es/work/kajual-gastronomia/', 'en', new Set(['kajual-gastronomia']))).toBe('/en/work/kajual-gastronomia/');
});

test('falls back to target locale home for unsupported paths', () => {
  expect(switchLocalePath('/es/unknown/', 'en', new Set())).toBe('/en/');
});

test('does not accept a slash-containing slug', () => {
  expect(switchLocalePath('/es/work/a/b/', 'en', new Set(['a']))).toBe('/en/');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- --run tests/locale.test.ts`

Expected: FAIL because `switchLocalePath` does not exist.

- [ ] **Step 3: Implement strict locale routing helpers**

Use `const LOCALES = ['es', 'en'] as const`. `localizedPath()` must return slash-terminated URLs. `switchLocalePath()` may preserve only homepage, about, contact, work index, and a single `work/:slug` segment whose slug is in `knownSlugs`; every other pathname returns `/${targetLocale}/`. Do not infer translations from browser language and do not use a cross-language content fallback.

- [ ] **Step 4: Run locale tests and static type checks**

Run: `npm run test:run -- tests/locale.test.ts && npm run check`

Expected: PASS with exact paths from the tests and no TypeScript errors.

- [ ] **Step 5: Commit locale utilities**

```bash
git add src/lib/locale.ts tests/locale.test.ts
git commit -m "feat: add locale-safe portfolio URLs"
```

## Task 4: Build the accessible shared visual foundation

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/LanguageSwitcher.astro`
- Create: `src/data/profile.ts`
- Create: `src/pages/[locale]/index.astro`
- Create: `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Consumes: locale utilities, profile copy, current pathname, and page metadata.
- Produces: `BaseLayout` with a skip link, localized document language, canonical/alternate links, primary navigation, and visible keyboard focus.

- [ ] **Step 1: Write failing end-to-end tests for the shared shell**

```ts
import { expect, test } from '@playwright/test';

test('Spanish homepage exposes localized primary navigation and a language switch', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('navigation').getByRole('link', { name: /proyectos/i })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/');
});

test('keyboard users can see a skip link', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /saltar al contenido/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the E2E test to verify it fails**

Run: `npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: FAIL because localized pages and shared components do not exist.

- [ ] **Step 3: Implement tokens, layout, and navigation**

Use the approved visual system: warm ivory surface, charcoal ink, controlled violet/orange/acid-green accents, Satoshi for display/body, and Fira Mono for metadata. In CSS define `:focus-visible`, a screen-reader utility, an explicit `@media (prefers-reduced-motion: reduce)` rule that removes nonessential transitions, responsive spacing tokens, and AA-safe text colors.

`BaseLayout` must accept `{ locale, title, description, canonicalPath }`, emit `lang`, description, canonical, `hreflang="es"`, `hreflang="en"`, and `x-default` links, and wrap only page content in `<main id="main-content">`. Header navigation must be `Work`, `About`, and `Contact` localized in both languages—without audience segmentation. Create an always-visible keyboard skip link and a CSS-only responsive navigation; do not add a JavaScript menu dependency. Create a minimal localized homepage route that uses this shared shell; Task 7 replaces its temporary main content with the approved narrative.

- [ ] **Step 4: Run shared-shell verification**

Run: `npm run check && npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: PASS. Verify both `prefers-reduced-motion` and default media modes manually in browser devtools after the automated run.

- [ ] **Step 5: Commit visual foundation**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/SiteHeader.astro src/components/SiteFooter.astro src/components/LanguageSwitcher.astro src/data/profile.ts src/pages/[locale]/index.astro tests/e2e/portfolio.spec.ts
git commit -m "feat: add accessible bilingual site shell"
```

## Task 5: Render project cards, galleries, and the complete work collection

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ProjectGallery.astro`
- Create: `src/pages/[locale]/work/index.astro`
- Modify: `src/lib/projects.ts`
- Create: `tests/project-links.test.ts`
- Modify: `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Consumes: ordered `ProjectRecord[]`, `locale`, and translation fields from Task 2.
- Produces: collection page and cards that render every project in deterministic order, safely handling `liveUrl: null` through `getLiveLink()`.

- [ ] **Step 1: Add failing collection and unavailable-link E2E tests**

```ts
test('work collection renders all seven records in both locales', async ({ page }) => {
  await page.goto('/en/work/');
  await expect(page.locator('[data-project-card]')).toHaveCount(7);
  await expect(page.getByRole('heading', { name: /congero technology group/i })).toBeVisible();
});

test('project cards render a deterministic collection', async ({ page }) => {
  await page.goto('/es/work/');
  await expect(page.locator('[data-project-card]')).toHaveCount(7);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: FAIL because the work collection and cards do not exist.

- [ ] **Step 3: Implement collection components and route**

Add this unit test before the component implementation:

```ts
import { expect, test } from 'vitest';
import { getLiveLink } from '../src/lib/projects';

test('does not produce an external link for an unavailable live site', () => {
  expect(getLiveLink({ liveUrl: null } as never)).toBeNull();
});
```

`ProjectCard` must include an article with `data-project-card`, one heading, translated summary, technology labels, image with explicit width/height and localized alt, internal case/profile link, and an external live-site link only when `getLiveLink(project)` returns a URL. Add `rel="noreferrer"` to external links. `ProjectGallery` must use semantic `<figure>`, `<img>`, and `<figcaption>` elements, lazy-load below-the-fold media, and never rely on images for essential facts.

The work route must generate static paths for both locales, query the content collection, call `getOrderedProjects()`, and render every record. Implement `getLiveLink(project: Pick<ProjectRecord, 'liveUrl'>): string | null` in `src/lib/projects.ts`; do not add a fake portfolio project to production JSON.

- [ ] **Step 4: Run collection verification**

Run: `npm run test:run && npm run check && npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: PASS with seven records, correctly localized cards, no empty external `href`, and a `null` live URL that renders no external anchor.

- [ ] **Step 5: Commit collection UI**

```bash
git add src/components/ProjectCard.astro src/components/ProjectGallery.astro src/pages/[locale]/work/index.astro src/lib/projects.ts tests/project-links.test.ts tests/e2e/portfolio.spec.ts
git commit -m "feat: add selected work collection"
```

## Task 6: Generate full and short project profile routes with localized recovery

**Files:**
- Create: `src/components/CaseStudy.astro`
- Create: `src/pages/[locale]/work/[slug].astro`
- Create: `src/pages/404.astro`
- Modify: `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Consumes: validated project records, locale route parameters, and `getProjectBySlug()`.
- Produces: static project pages, four fully detailed case studies, three short profiles, and locale-aware unavailable-page recovery.

- [ ] **Step 1: Write failing case-study and bad-route E2E tests**

```ts
test('featured case study renders role, decisions, outcome, and gallery', async ({ page }) => {
  await page.goto('/en/work/congero-technology-group/');
  await expect(page.getByRole('heading', { name: /congero technology group/i })).toBeVisible();
  await expect(page.getByTestId('case-decisions')).toBeVisible();
  await expect(page.getByTestId('case-outcome')).toBeVisible();
  await expect(page.locator('figure')).not.toHaveCount(0);
});

test('unknown work slug does not expose another project', async ({ page }) => {
  await page.goto('/es/work/no-existe/');
  await expect(page.getByRole('heading', { name: /página no encontrada/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /explorar proyectos/i })).toHaveAttribute('href', '/es/work/');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: FAIL because no dynamic route or not-found behavior exists.

- [ ] **Step 3: Implement project detail and recovery pages**

Create `getStaticPaths()` for every valid locale/slug pair. `CaseStudy` must render the full sections only when `caseStudy === true`; short profiles must not display empty headings or empty gallery containers. The static host's unknown routes must resolve to the bilingual `404.astro` output, which displays Spanish and English recovery links; never fall back to a different project or locale.

The page must include technologies, role, challenge, solution, live-site state, gallery, previous/next internal project navigation, and metadata derived from localized title/summary. The Estructuras record must identify implementation from external Figma design; no case may imply sole credit where that is untrue.

- [ ] **Step 4: Run route and recovery verification**

Run: `npm run test:run && npm run check && npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: PASS for four complete cases, three concise profiles, both locales, and bilingual 404 recovery.

- [ ] **Step 5: Commit detail pages**

```bash
git add src/components/CaseStudy.astro src/pages/[locale]/work/[slug].astro src/pages/404.astro tests/e2e/portfolio.spec.ts
git commit -m "feat: add localized project case studies"
```

## Task 7: Build the single-journey homepage, About, and Contact pages

**Files:**
- Create: `src/components/ContactLinks.astro`
- Create: `src/pages/index.astro`
- Modify: `src/pages/[locale]/index.astro`
- Create: `src/pages/[locale]/about.astro`
- Create: `src/pages/[locale]/contact.astro`
- Modify: `src/data/profile.ts`
- Modify: `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Consumes: `getFeaturedProjects()`, profile copy, locale utilities, and shared layout.
- Produces: home, about, and contact pages with one project-first narrative and three direct contact methods.

- [ ] **Step 1: Write failing user-journey E2E tests**

```ts
test('homepage uses one primary project action and never asks visitors to self-segment', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.getByRole('link', { name: /explore selected work/i })).toHaveCount(1);
  await expect(page.getByText(/for recruiters/i)).toHaveCount(0);
  await expect(page.getByText(/for clients/i)).toHaveCount(0);
});

test('contact page exposes scheduling, email, and LinkedIn', async ({ page }) => {
  await page.goto('/es/contact/');
  await expect(page.getByRole('link', { name: /agendar/i })).toHaveCount(1);
  await expect(page.getByRole('link', { name: /email/i })).toHaveAttribute('href', /mailto:/);
  await expect(page.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', /linkedin\.com/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: FAIL because homepage, about, contact, and root redirect are absent.

- [ ] **Step 3: Implement the personal narrative routes**

Populate `profile.ts` with reviewed bilingual copy sourced from Andrés's approved résumé: 10 years of experience; advertising design degree; WordPress/PHP, front-end, commerce, integrations, performance, accessibility, technical SEO, and production support. Include no unverified individual metrics.

Homepage order is fixed: introduction, exactly one `Explore selected work / Explorar proyectos seleccionados` action, four featured projects, capability groups, experience snapshot, then contact close. Do not add competing audience routes. The root page must redirect to `/es/`. Contact methods are scheduling URL (configured as a typed profile field), `mailto:andresisraelumanasedo@gmail.com`, and `https://www.linkedin.com/in/israel-umana-sedo/`; external links use `rel="noreferrer"`.

- [ ] **Step 4: Run journey verification**

Run: `npm run test:run && npm run check && npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: PASS. Confirm that page source works without scripts and that no form or backend endpoint is introduced.

- [ ] **Step 5: Commit narrative pages**

```bash
git add src/components/ContactLinks.astro src/pages/index.astro src/pages/[locale]/index.astro src/pages/[locale]/about.astro src/pages/[locale]/contact.astro src/data/profile.ts tests/e2e/portfolio.spec.ts
git commit -m "feat: add personal portfolio journey"
```

## Task 8: Add real project imagery, SEO assets, and build-time quality checks

**Files:**
- Create: `public/images/projects/README.md`
- Add: `public/images/projects/*`
- Create: `public/social/default-og.jpg`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Create: `src/lib/seo.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/content/projects.json`
- Modify: `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Consumes: authorized/public image files and localized project/profile metadata.
- Produces: optimized visual evidence, social metadata, and no broken/missing image paths in the static build.

- [ ] **Step 1: Write failing metadata and imagery E2E tests**

```ts
test('a Spanish case emits localized SEO and complete image alternatives', async ({ page }) => {
  await page.goto('/es/work/kajual-gastronomia/');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
  await expect(page.locator('img[alt=""]')).toHaveCount(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts`

Expected: FAIL because the metadata builder and approved imagery assets do not exist.

- [ ] **Step 3: Add only approved imagery and metadata generation**

For each project, collect a public or client-authorized screenshot/photo and record its source/authorization in `public/images/projects/README.md`. Resize and encode images before committing; do not commit raw multi-megabyte screenshots. Every production image gets a width, height, Spanish alt, English alt, and caption where it conveys material context.

Implement `buildSeo({ locale, title, description, canonicalPath, imagePath })` in `src/lib/seo.ts` and emit title, description, canonical, Open Graph, Twitter, and language-alternate metadata from `BaseLayout`. Set `robots.txt` to allow crawling and provide the final site map URL only after the production domain is confirmed; until then use `Sitemap:` with no value omitted rather than a guessed hostname.

- [ ] **Step 4: Run asset, metadata, and size checks**

Run: `npm run check && npm run build && npm run test:e2e -- tests/e2e/portfolio.spec.ts && find dist -type f -size +5000k -print`

Expected: tests PASS and final command prints no files larger than 5 MB. Manually inspect mobile and desktop image cropping before accepting the task.

- [ ] **Step 5: Commit visual evidence and metadata**

```bash
git add public/images/projects public/social/default-og.jpg public/favicon.svg public/robots.txt src/lib/seo.ts src/layouts/BaseLayout.astro src/content/projects.json tests/e2e/portfolio.spec.ts
git commit -m "feat: add portfolio imagery and localized metadata"
```

## Task 9: Prepare safe server deployment and conduct a review deployment

**Files:**
- Create: `scripts/deploy-static.sh`
- Create: `docs/deployment.md`
- Create: `docs/server/caddy-work.soluciondigital.cr.caddyfile`
- Create: `docs/server/nginx-work.soluciondigital.cr.conf`
- Modify: `.github/workflows/verify.yml`

**Interfaces:**
- Consumes: `dist/` from `npm run build`, explicit deployment environment variables, and the existing server's identified reverse proxy.
- Produces: reproducible static upload documentation and exactly one reviewed reverse-proxy virtual-host configuration for `work.soluciondigital.cr`.

- [ ] **Step 1: Write a failing deployment preflight test**

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_USER:?DEPLOY_USER is required}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
test -d dist
```

Save the snippet as the first part of `scripts/deploy-static.sh` and run it without variables.

- [ ] **Step 2: Run preflight to verify it fails safely**

Run: `bash scripts/deploy-static.sh`

Expected: FAIL before any network operation, with `DEPLOY_HOST is required`.

- [ ] **Step 3: Implement deployment script and inspect server before changing it**

After a successful local build, make the script run `rsync -az --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"`. Do not put a hostname, private key path, user name, or target directory in the repository.

Before applying any server configuration, connect using the user-provided SSH method and run:

```bash
sudo systemctl is-active caddy || true
sudo systemctl is-active nginx || true
sudo caddy adapt --config /etc/caddy/Caddyfile --pretty 2>/dev/null || true
sudo nginx -T 2>/dev/null | sed -n '1,220p' || true
```

If Caddy is active, use only `docs/server/caddy-work.soluciondigital.cr.caddyfile` with `try_files {path} {path}/ =404` and an error handler that serves `/404.html` while retaining status `404`. If Nginx is active, use only `docs/server/nginx-work.soluciondigital.cr.conf` with `try_files $uri $uri/ =404;` and `error_page 404 /404.html;`. Both templates must serve `/var/www/work.soluciondigital.cr`, set long immutable cache headers only for fingerprinted assets, and preserve the existing Solución Digital virtual host unchanged. Validate the chosen proxy with `caddy validate` or `nginx -t` before reload. Obtain and confirm DNS for `work.soluciondigital.cr` before requesting TLS.

- [ ] **Step 4: Run a controlled deployment verification**

Run locally: `npm run test:run && npm run check && npm run build`

Run with explicit shell environment values supplied outside Git: `DEPLOY_HOST='...' DEPLOY_USER='...' DEPLOY_PATH='...' bash scripts/deploy-static.sh`

Then verify: `curl --fail --location --silent --show-error https://work.soluciondigital.cr/es/ > /dev/null` and the equivalent `/en/`, one project route, and one 404 route.

Expected: all commands exit `0`; both locales and a project route return `200`; the unknown path returns `404`; the existing `soluciondigital.cr` behavior is unchanged.

- [ ] **Step 5: Commit deployment tooling and documentation**

```bash
git add scripts/deploy-static.sh docs/deployment.md docs/server .github/workflows/verify.yml
git commit -m "chore: document static portfolio deployment"
```

## Task 10: Run release verification and document the launch state

**Files:**
- Create: `docs/release-checklist.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed static site, automated checks, public deployment URL, and Git history.
- Produces: a repeatable launch checklist and a repository entrypoint for future maintenance.

- [ ] **Step 1: Write failing checklist completeness test**

```ts
import { expect, test } from 'vitest';
import { readFileSync } from 'node:fs';

test('release checklist covers required launch checks', () => {
  const checklist = readFileSync('docs/release-checklist.md', 'utf8');
  for (const item of ['Spanish', 'English', 'keyboard', 'reduced motion', 'external links', '404', 'confidentiality']) {
    expect(checklist.toLowerCase()).toContain(item.toLowerCase());
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run tests/release-checklist.test.ts`

Expected: FAIL because the checklist file does not exist.

- [ ] **Step 3: Add a release checklist and maintainer README**

The checklist must require review of Spanish and English content, all seven projects, every live URL, correct contributor attribution, image authorization, confidentiality, desktop/mobile views, keyboard navigation, focus visibility, reduced motion, contrast, external links, social cards, 404 behavior, build output, HTTPS deployment, and GitHub Actions status.

The README must explain local setup, every npm command, content location/schema, adding a new project, image standards, deploy environment variables, and that Nauyaca is the next flagship case study with its confidential-Ads constraint. Do not include secrets, server addresses, or credentials.

- [ ] **Step 4: Run the full release suite**

Run: `npm ci && npm run test:run && npm run check && npm run build && npm run test:e2e`

Expected: all commands PASS. Review `git status --short`, confirm no generated build/test artifacts are tracked, and inspect the deployed URL only after the deployment task has succeeded.

- [ ] **Step 5: Commit launch documentation**

```bash
git add README.md docs/release-checklist.md tests/release-checklist.test.ts
git commit -m "docs: add portfolio launch checklist"
```

## Plan self-review

### Spec coverage

- Personal bilingual brand, single journey, seven launch projects, four long-form cases, future Nauyaca handling, content rules, visual language, structured content, deployment portability, failure states, accessibility, and verification each map to Tasks 1–10.
- No database, CMS, authentication, analytics, newsletter, or form backend is introduced.
- The current `soluciondigital-cr` project remains untouched; Task 9 explicitly preserves its virtual host.

### Consistency and review focus

- `ProjectRecord`, `getOrderedProjects`, `getFeaturedProjects`, `getProjectBySlug`, and locale-helper interfaces are introduced before consuming tasks.
- The five review-focus failure modes are covered by explicit tests in Tasks 2–6 and 9.
- No execution step uses a guessed SSH host, user, private key, or server path. Deployment values are supplied outside the repository after server inspection.
