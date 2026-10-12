import type { Locale } from './locale';
import { sitePath } from './site-path';

const defaultSiteOrigin = new URL('https://work.soluciondigital.cr');

type SeoInput = {
  locale: Locale;
  title: string;
  description: string;
  canonicalPath: string;
  imagePath?: string;
  imageAlt?: string;
  origin?: URL;
  base?: string;
};

const absoluteUrl = (path: string, origin: URL, base: string) => new URL(sitePath(path, base), origin).toString();

export function buildSeo({ locale, title, description, canonicalPath, imagePath = '/social/andres-israel-umana-digital-work-thumbnail.png', imageAlt = title, origin = defaultSiteOrigin, base = '/' }: SeoInput) {
  const alternateLocale: Locale = locale === 'es' ? 'en' : 'es';
  const alternatePath = canonicalPath.replace(/^\/(es|en)(?=\/)/, `/${alternateLocale}`);

  return {
    title,
    description,
    canonicalUrl: absoluteUrl(canonicalPath, origin, base),
    imageUrl: absoluteUrl(imagePath, origin, base),
    imageAlt,
    alternateLocale,
    alternateUrl: absoluteUrl(alternatePath, origin, base),
    defaultLocaleUrl: absoluteUrl('/es/', origin, base),
    localeCode: locale === 'es' ? 'es_CR' : 'en_US',
  };
}
