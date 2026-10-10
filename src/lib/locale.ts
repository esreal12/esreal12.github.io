export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localizedPath(locale: Locale, path = ''): string {
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');

  return normalizedPath ? `/${locale}/${normalizedPath}/` : `/${locale}/`;
}

export function switchLocalePath(
  currentPath: string,
  targetLocale: Locale,
  knownSlugs: ReadonlySet<string>,
): string {
  const segments = currentPath.split('/').filter(Boolean);

  if (!isLocale(segments[0] ?? '')) return localizedPath(targetLocale);

  const route = segments.slice(1);

  if (route.length === 0) return localizedPath(targetLocale);
  if (route.length === 1 && ['about', 'contact', 'work'].includes(route[0])) {
    return localizedPath(targetLocale, route[0]);
  }

  if (
    route.length === 2 &&
    route[0] === 'work' &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(route[1]) &&
    knownSlugs.has(route[1])
  ) {
    return localizedPath(targetLocale, `work/${route[1]}`);
  }

  return localizedPath(targetLocale);
}
