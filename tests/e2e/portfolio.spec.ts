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
