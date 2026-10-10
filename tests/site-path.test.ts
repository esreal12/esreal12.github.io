import { expect, test } from 'vitest';
import { sitePath } from '../src/lib/site-path';

test('creates root-safe paths for the production domain', () => {
  expect(sitePath('/es/work/', '/')).toBe('/es/work/');
  expect(sitePath('images/projects/abc-overview.jpg', '/')).toBe('/images/projects/abc-overview.jpg');
});

test('prefixes paths for a GitHub Pages project site', () => {
  expect(sitePath('/es/work/', '/andres-israel-umana-digital-work/')).toBe('/andres-israel-umana-digital-work/es/work/');
  expect(sitePath('/favicon.svg', '/andres-israel-umana-digital-work/')).toBe('/andres-israel-umana-digital-work/favicon.svg');
});
