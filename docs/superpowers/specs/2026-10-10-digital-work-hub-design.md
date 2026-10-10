# Andrés Israel Umaña Sedó — Digital Work: Design Specification

**Date:** 2026-10-10  
**Status:** Design approved; pending written-spec review and implementation planning  
**Product:** Personal bilingual portfolio hub

## 1. Purpose

Create a bilingual (Spanish/English) personal portfolio for Andrés Israel Umaña Sedó. It must give prospective clients and recruiters a single, coherent journey through the same evidence: the ability to understand a business problem, design a clear experience, build a durable web solution, and support it in production.

The portfolio will initially be reviewed at `work.soluciondigital.cr` and must be portable to an independent domain without a rebuild. It is a personal property and must not be presented as a Solución Digital marketing page, although that business is part of Andrés's professional experience.

## 2. Goals and success criteria

### Goals

- Present Andrés as a senior, cross-disciplinary digital professional: design, UI/UX, front-end, WordPress/PHP, commerce, integrations, performance, and production support.
- Make selected work easy to explore in Spanish and English from the first release.
- Support both client and recruiting conversations through one project-first narrative, rather than separate audience funnels.
- Establish a versioned, maintainable content model that can grow from seven initial projects to a larger body of work.
- Preserve factual accuracy, appropriate attribution, and client confidentiality.

### Success criteria

- A visitor can understand Andrés's positioning, view selected work, and reach a contact method in two or fewer primary navigation actions.
- Every initial project has a bilingual title, summary, role, technology list, image alternative text, and public-link state.
- The four featured cases include a full, reusable case-study structure.
- The site is responsive, keyboard navigable, meets WCAG AA contrast expectations, respects `prefers-reduced-motion`, and has localized metadata.
- Moving from the review hostname to a future personal domain requires only deployment/DNS configuration and URL metadata changes.

## 3. Positioning and narrative

### Brand

**Andrés Israel Umaña Sedó — Digital Work**

The central promise is: **I design, build, and maintain web experiences and systems that solve real business needs.**

It is intentionally broader and more credible than “I make websites.” The case studies must demonstrate visual judgment, technical implementation, operational understanding, and ongoing care where relevant.

### Audience model

There is one visitor path for everyone. A client and a recruiter see the same sequence—positioning, work, capability, experience, contact—and derive different value from the same evidence. The site must not contain competing “client” and “recruiter” routes or calls to action.

## 4. Information architecture

### Primary navigation

- `Work` / `Proyectos`
- `About` / `Sobre mí`
- `Contact` / `Contacto`
- Language switcher (`ES` / `EN`)

### Primary routes

| Route | Purpose |
| --- | --- |
| `/es/`, `/en/` | Homepage; positioning, selected work, capabilities, experience snapshot, and contact. |
| `/es/work/`, `/en/work/` | Complete collection of selected projects. |
| `/es/work/[slug]/`, `/en/work/[slug]/` | A bilingual case study or short project profile. |
| `/es/about/`, `/en/about/` | Expanded professional story, approach, and experience. |
| `/es/contact/`, `/en/contact/` | Agenda, direct email, and LinkedIn. |
| localized 404 routes | Helpful recovery to the matching locale. |

### Homepage sequence

1. Personal introduction and concise promise.
2. A single primary action: **Explore selected work / Explorar proyectos seleccionados**.
3. Featured projects as evidence of the work.
4. Capability groups: design and UX; content, commerce, and platforms; integrations; performance and operations.
5. Professional experience snapshot and LinkedIn link.
6. Single contact close with scheduling, email, and LinkedIn alternatives.

## 5. Project collection

### Launch collection

| Presentation | Project | Focus |
| --- | --- | --- |
| Full case study | Asociación Bancaria Costarricense | Institutional platform, custom WordPress/PHP components, long-term platform support. |
| Full case study | Kajual Gastronomía | Shopify commerce and reservations, including custom Liquid work. |
| Full case study | Estructuras S.A. | Figma implementation, WordPress development, supplier-related workflow planning. |
| Full case study | Congero Technology Group | Improved design implementation in WordPress and technical operation on AWS/Bitnami via SSH. |
| Short profile | Biophilia Park | Web design with WordPress and Elementor. |
| Short profile | Raindrop Spa | Web design with WordPress and Elementor. |
| Short profile | Francisco Saco | Video-centered front end with React, TypeScript, and Vite. |

### Next featured addition

Nauyaca Waterfall Nature Park is deliberately held for the next content pass, where it will become a flagship full case study. The approved result language is: the administrator reported an approximately 40% sales increase after the redesign and Google Ads campaign. The portfolio must not disclose campaign configuration, budget, targeting, or internal Google Ads data.

### Case-study template

1. Discipline label, project name, year, and live-site state.
2. One-sentence problem or opportunity.
3. Context and Andrés's exact role/scope.
4. Design and development decisions.
5. Relevant technology and production/operational context.
6. Optimized visual gallery with descriptive captions.
7. Authorized outcome or result, if available.
8. Live-project link and a relevant next-project path.

Short profiles use the same data shape but initially render only the overview, role, technology, visual, and public link. They can be promoted to full cases without a template migration.

## 6. Content governance

- All content is written deliberately in Spanish and English; English is not a machine translation fallback.
- Quantified business outcomes require Andrés's validation and an attribution/source note where useful.
- Do not include non-public client data, credentials, AWS infrastructure details, campaign data, or unapproved analytics.
- Public screenshots and authorized photographs may be used. Every image needs meaningful alternative text in both languages.
- Credit external agencies, visual designers, or collaborators where appropriate. For example, Estructuras S.A. must accurately state when work was implemented from external Figma designs.
- A failed external project URL must not remove its portfolio entry; the project remains legible and displays an unavailable-link state.

## 7. Visual system

The visual language inherits Solución Digital's warmth and craft without reproducing its commercial identity.

- **Surface:** warm ivory paper with subtle texture.
- **Type:** Satoshi for reading and headings; Fira Mono for technologies, labels, dates, and technical details.
- **Color:** charcoal ink as the reading color; restrained violet, burnt orange, and acid green accents from the Solución Digital palette.
- **Layout:** spacious editorial grid, strong typographic hierarchy, and variable project-card proportions.
- **Imagery:** real project imagery and public/approved screenshots; no generic device mockups as a substitute for evidence.
- **Motion:** short, optional transitions that never gate content; reduced-motion preferences disable or minimize them.
- **Identity:** a typographic personal mark, “Andrés Israel Umaña Sedó — Digital Work.” Solución Digital branding is limited to factual professional context.

## 8. Technical architecture

### Application

- Astro static site with TypeScript.
- A content collection or equivalent typed data layer for project records and localized copy.
- Shared layout, navigation, project-card, case-study, gallery, technology-list, contact, and metadata components.
- Static assets optimized at build time, with responsive image variants where source assets support them.

### Localization

- Explicit `/es/` and `/en/` routes.
- Localized navigation, metadata, image descriptions, and project content.
- Locale switcher maps to the equivalent route when a translation exists; otherwise it returns to the target-locale homepage.
- Proper `lang`, canonical, and alternate-language metadata.

### Data flow

1. Bilingual project records provide structured content to collection and case-study routes.
2. Shared components render the records consistently and receive only the fields they need.
3. The static build produces a portable output directory for server deployment.
4. The deployment environment serves the static output at the review hostname; Git remains the source of truth.

### Boundaries

The initial release has no database, authentication, analytics requirement, CMS, or contact form backend. External calls to action use configured links for scheduling, email, and LinkedIn. This intentionally keeps the first release secure, fast, and portable.

## 9. Deployment and version control

- Repository location: `/Users/isreal/Documents/GitHub/andres-israel-umana-digital-work`.
- Local Git repository begins on `main`; GitHub will be its remote source of record once GitHub access or repository creation is available.
- `main` is the version eligible for review/deployment. Work is developed in focused branches and merged only after verification.
- Review deployment target: `work.soluciondigital.cr`.
- Future personal-domain migration is a deployment configuration step, not an application redesign.
- Server access, when used, must follow a least-privilege SSH configuration. No credentials or server-specific secrets enter the repository.

## 10. Quality, failure behavior, and verification

### Failure behavior

- Missing project records fail the build through typed content validation.
- Missing optional project imagery uses an intentional neutral visual treatment and keeps the project text readable.
- Broken external links do not hide a project; the UI shows its unavailable-link state.
- Unknown localized paths use a locale-aware 404 page with recovery links.

### Verification before deployment

- Build and static-route verification.
- Desktop and mobile layout checks.
- Keyboard navigation, focus visibility, reduced-motion behavior, and contrast review.
- ES/EN route, language-switcher, title, description, canonical, and social preview verification.
- External link and live-project state check.
- Image dimensions, optimization, descriptive alternative text, and page-weight review.
- Editorial fact/attribution review, including confidentiality constraints.

## 11. Explicit exclusions for the first release

- Separate audience funnels for clients and recruiters.
- Public Google Ads campaign data or internal business metrics.
- A user account system, CMS, blog, newsletter, or database.
- Generic stock imagery that substitutes for actual project evidence.
- Any change to the existing `soluciondigital-cr` repository or its live commercial site.
