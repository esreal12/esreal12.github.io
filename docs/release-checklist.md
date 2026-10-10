# Portfolio launch checklist

Complete this review before each production release. Do not treat a successful build as approval for publication.

## Content and attribution

- [ ] Review every Spanish page for accuracy, accents, headings, and clear calls to action.
- [ ] Review every English page for equivalent meaning, tone, and links.
- [ ] Confirm all seven launch projects are present, ordered correctly, and point to the intended live URL.
- [ ] Confirm each role, discipline, technology, result, and contributor attribution is accurate; do not claim supplied visual design as personal design work.
- [ ] Confirm every project image has documented authorization or source, an optimized file size, and appropriate Spanish and English alternative text.
- [ ] Keep client material confidential. Do not publish advertising dashboards, spend, targeting, reports, private screenshots, credentials, or unpublished client information.
- [ ] For the future Nauyaca case, use only the approved client-reported approximate outcome and exclude confidential Google Ads detail.

## Experience and accessibility

- [ ] Review the homepage, work collection, case studies, About, and Contact in desktop and mobile layouts.
- [ ] Navigate each route with a keyboard; verify the skip link, visible focus, navigation, language switcher, cards, and external links.
- [ ] Check reduced-motion behavior and ensure no essential information relies only on animation.
- [ ] Review text and interactive control contrast against their backgrounds.
- [ ] Verify external links open intentionally, have the correct destination, and preserve the user’s current portfolio page.
- [ ] Verify Open Graph and social-card title, description, image, canonical URL, and Spanish/English language alternates.
- [ ] Request an unknown route and confirm it returns status `404` with the localized recovery page.

## Release controls

- [ ] Run `npm ci && npm run test:run && npm run check && npm run build && npm run test:e2e`.
- [ ] Confirm `dist/`, `node_modules/`, test results, credentials, and local environment files are not tracked by Git.
- [ ] Review the pull request and confirm the GitHub Actions workflow is passing.
- [ ] Confirm HTTPS and DNS for `work.soluciondigital.cr` resolve to the dedicated portfolio document root.
- [ ] Verify `/es/`, `/en/`, one project route, and a missing route on the deployed site.
- [ ] Confirm the existing `soluciondigital.cr` site remains unchanged.
