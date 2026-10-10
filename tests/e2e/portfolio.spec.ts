import { expect, test } from '@playwright/test';

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

test('work collection renders all seven records in English', async ({ page }) => {
  await page.goto('/en/work/');

  await expect(page.locator('[data-project-card]')).toHaveCount(7);
  await expect(page.getByRole('heading', { name: /congero technology group/i })).toBeVisible();
});

test('work collection renders all seven records in Spanish', async ({ page }) => {
  await page.goto('/es/work/');

  await expect(page.locator('[data-project-card]')).toHaveCount(7);
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
  await expect(page.getByRole('img', { name: /cubierta tipográfica.*biophilia/i })).toBeVisible();
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

test('contact page exposes scheduling, email, and LinkedIn', async ({ page }) => {
  await page.goto('/es/contact/');
  const main = page.locator('main');

  await expect(main.getByRole('link', { name: /agendar/i })).toHaveCount(1);
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
