import { expect, test } from '@playwright/test';

test('the site root silently prioritizes English', async ({ page }) => {
  const response = await page.request.get('/');
  const markup = await response.text();

  expect(markup).not.toMatch(/Redirecting/i);
  expect(markup).not.toMatch(/<a\b/i);

  await page.goto('/');

  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('technical visitors can find a professional signature', async ({ page }) => {
  const response = await page.request.get('/humans.txt');
  const signature = await response.text();

  expect(response.status()).toBe(200);
  expect(signature).toContain('Andrés Israel Umaña Sedó');
  expect(signature).toContain('Astro');
  expect(signature).toContain('Zipaquirá, Cundinamarca');
  expect(signature).not.toContain('Location: Costa Rica');
  expect(signature).toContain('Eligible to work in Colombia and Costa Rica; available remotely.');
});

test('portfolio pages identify their author in metadata', async ({ page }) => {
  await page.goto('/en/');

  await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'Andrés Israel Umaña Sedó');
});

test('technical visitors receive an implementation note in DevTools', async ({ page }) => {
  const messages: string[] = [];
  page.on('console', (message) => messages.push(message.text()));

  await page.goto('/en/');

  expect(messages).toContain(
    'Digital Work — Built by Andrés Israel Umaña Sedó with Astro, TypeScript, semantic HTML, and custom CSS. Curious about the implementation? https://github.com/esreal12/esreal12.github.io',
  );
});

test('about introduces Andrés with a portrait and downloadable CV', async ({ page }) => {
  await page.goto('/en/about/');

  await expect(page.getByRole('img', { name: /Andrés Israel Umaña Sedó/i })).toBeVisible();
  await expect(page.getByText('Eligible to work in Colombia and Costa Rica; available remotely.')).toBeVisible();
  await expect(page.getByRole('link', { name: /download cv/i })).toHaveAttribute('href', /andres-israel-umana-sedo-cv\.pdf$/);
  await expect(page.getByRole('link', { name: /download cv/i })).toHaveAttribute('download', '');
});

test('Spanish homepage exposes localized primary navigation and a language switch', async ({
  page,
}) => {
  await page.goto('/es/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('navigation').getByRole('link', { name: /proyectos/i })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'EN', exact: true })).toHaveAttribute('href', '/en/');
});

test('keyboard users can see a skip link', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');

  await expect(page.getByRole('link', { name: /saltar al contenido/i })).toBeVisible();
});

test('work collection renders all eight records in English', async ({ page }) => {
  await page.goto('/en/work/');

  await expect(page.locator('[data-project-card]')).toHaveCount(8);
  await expect(page.getByRole('heading', { name: /congero technology group/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /brojanowski/i })).toBeVisible();
});

test('project cards use the approved project captures', async ({ page }) => {
  await page.goto('/en/work/');

  await expect(page.locator('[data-project-card="kajual-gastronomia"] img')).toHaveAttribute('src', /kajual-capture\.png$/);
  await expect(page.locator('[data-project-card="biophilia-park"] img')).toHaveAttribute('src', /biophilia-park-capture\.jpg$/);
  await expect(page.locator('[data-project-card="francisco-saco"] img')).toHaveAttribute('src', /francisco-saco-capture\.jpg$/);
  await expect(page.locator('[data-project-card="brojanowskis-digital-store"] img')).toHaveAttribute('src', /brojanowski-hero-capture\.png$/);
  await expect(page.locator('[data-project-card="congero-technology-group"] img')).toHaveAttribute('src', /congero-hero-capture\.jpg$/);
});

test('Brojanowski case study documents ecommerce, memberships, and motion work', async ({ page }) => {
  await page.goto('/en/work/brojanowskis-digital-store/');

  await expect(page.getByRole('heading', { name: /brojanowski/i })).toBeVisible();
  const technologies = page.locator('.case-facts dd').nth(1);
  await expect(technologies).toContainText('WooCommerce');
  await expect(technologies).toContainText('MemberPress');
  await expect(page.getByTestId('case-decisions')).toBeVisible();
  await expect(page.getByTestId('case-outcome')).toBeVisible();
  await expect(page.locator('.project-gallery figure')).toHaveCount(1);
  await expect(page.locator('.project-gallery img')).toHaveAttribute('src', /brojanowski-page-capture\.png$/);
});

test('Congero case study includes its hero and long-form captures', async ({ page }) => {
  await page.goto('/en/work/congero-technology-group/');

  const gallery = page.locator('.project-gallery');
  await expect(gallery.locator('figure')).toHaveCount(1);
  await expect(gallery.locator('img')).toHaveAttribute('src', /congero-full-page-capture\.jpg$/);
});

test('case studies omit an image gallery when there is no visual beyond the hero', async ({ page }) => {
  await page.goto('/en/work/asociacion-bancaria-costarricense/');

  await expect(page.locator('.case-visual img')).toHaveAttribute('src', /abc-overview\.jpg$/);
  await expect(page.locator('.project-gallery')).toHaveCount(0);
});

test('work collection renders all eight records in Spanish', async ({ page }) => {
  await page.goto('/es/work/');

  await expect(page.locator('[data-project-card]')).toHaveCount(8);
});

test('featured case study renders role, decisions, outcome, and gallery', async ({ page }) => {
  await page.goto('/en/work/congero-technology-group/');

  await expect(page.getByRole('heading', { name: /congero technology group/i })).toBeVisible();
  await expect(page.getByTestId('case-decisions')).toBeVisible();
  await expect(page.getByTestId('case-outcome')).toBeVisible();
  await expect(page.locator('figure')).not.toHaveCount(0);
});

test('unknown work slug does not expose another project', async ({ page }) => {
  const response = await page.goto('/es/work/no-existe/');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /página no encontrada/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /explorar proyectos/i })).toHaveAttribute('href', '/es/work/');
});

test('malformed project paths render the localized 404 recovery response', async ({ page }) => {
  const response = await page.goto('/es/work/not%2Fa-real-project/');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /página no encontrada/i })).toBeVisible();
});

test('short profiles show their visual and omit full-case narrative sections', async ({ page }) => {
  const response = await page.goto('/es/work/biophilia-park/');

  expect(response?.status()).toBe(200);
  await expect(page.getByRole('img', { name: /página de inicio.*biophilia/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /el reto/i })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: /la solución/i })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: /rol y alcance/i })).toBeVisible();
});

test('homepage uses one primary project action and never asks visitors to self-segment', async ({ page }) => {
  await page.goto('/en/');

  await expect(page.getByRole('link', { name: /explore selected work/i })).toHaveCount(1);
  await expect(page.getByText(/for recruiters/i)).toHaveCount(0);
  await expect(page.getByText(/for clients/i)).toHaveCount(0);
});

test('contact page exposes personal email and LinkedIn without Solución Digital scheduling', async ({ page }) => {
  await page.goto('/es/contact/');
  const main = page.locator('main');

  await expect(main.locator('a[href*="calendly.com"]')).toHaveCount(0);
  await expect(main.getByRole('link', { name: /email/i })).toHaveAttribute('href', /mailto:/);
  await expect(main.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', /linkedin\.com/);
});

test('a Spanish case emits localized SEO and complete image alternatives', async ({ page }) => {
  await page.goto('/es/work/kajual-gastronomia/');

  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('img[alt=""]')).toHaveCount(0);
});
