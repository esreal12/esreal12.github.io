import type { Locale } from '../lib/locale';

type ProfileCopy = {
  navigation: { work: string; about: string; contact: string };
  skipLink: string;
  footer: string;
  home: { eyebrow: string; title: string; description: string };
};

export const profile = {
  name: 'Andrés Israel Umaña Sedó',
  mark: 'Digital Work',
  email: 'andresisraelumanasedo@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/israel-umana-sedo/',
  locales: {
    es: {
      navigation: { work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
      skipLink: 'Saltar al contenido',
      footer: 'Diseño, desarrollo y operación de experiencias web.',
      home: {
        eyebrow: 'Andrés Israel Umaña Sedó — Digital Work',
        title: 'Trabajo digital con criterio, claridad y continuidad.',
        description: 'Portafolio bilingüe en construcción.',
      },
    },
    en: {
      navigation: { work: 'Work', about: 'About', contact: 'Contact' },
      skipLink: 'Skip to content',
      footer: 'Design, development, and operation of web experiences.',
      home: {
        eyebrow: 'Andrés Israel Umaña Sedó — Digital Work',
        title: 'Digital work built with clarity, judgment, and continuity.',
        description: 'A bilingual portfolio in progress.',
      },
    },
  } satisfies Record<Locale, ProfileCopy>,
} as const;
