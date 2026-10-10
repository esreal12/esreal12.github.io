import type { Locale } from './locale';

const siteOrigin = new URL('https://work.soluciondigital.cr');

type SeoInput = {
  locale: Locale;
  title: string;
  description: string;
  canonicalPath: string;
  imagePath?: string;
};

const absoluteUrl = (path: string) => new URL(path, siteOrigin).toString();

export function buildSeo({ locale, title, description, canonicalPath, imagePath = '/social/default-og.jpg' }: SeoInput) {
  const alternateLocale: Locale = locale === 'es' ? 'en' : 'es';
  const alternatePath = canonicalPath.replace(/^\/(es|en)(?=\/)/, `/${alternateLocale}`);

  return {
    title,
    description,
    canonicalUrl: absoluteUrl(canonicalPath),
    imageUrl: absoluteUrl(imagePath),
    alternateLocale,
    alternateUrl: absoluteUrl(alternatePath),
    localeCode: locale === 'es' ? 'es_CR' : 'en_US',
  };
}
