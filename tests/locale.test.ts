import { expect, test } from 'vitest';
import { isLocale, localizedPath, switchLocalePath } from '../src/lib/locale';

test('preserves a known project slug when switching locales', () => {
  expect(
    switchLocalePath('/es/work/kajual-gastronomia/', 'en', new Set(['kajual-gastronomia'])),
  ).toBe('/en/work/kajual-gastronomia/');
});

test('falls back to target locale home for unsupported paths', () => {
  expect(switchLocalePath('/es/unknown/', 'en', new Set())).toBe('/en/');
});

test('does not accept a slash-containing slug', () => {
  expect(switchLocalePath('/es/work/a/b/', 'en', new Set(['a']))).toBe('/en/');
});

test('normalizes a localized path with a trailing slash', () => {
  expect(localizedPath('es', 'about')).toBe('/es/about/');
});

test('recognizes only supported locales', () => {
  expect(isLocale('en')).toBe(true);
  expect(isLocale('pt')).toBe(false);
});
