export function sitePath(path: string, base = '/'): string {
  const normalizedBase = base === '/'
    ? '/'
    : `/${base.replace(/^\/+|\/+$/g, '')}/`;
  const normalizedPath = path.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}
