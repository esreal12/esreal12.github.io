import { expect, test } from 'vitest';
import { projectSchema } from '../src/content.config';

test('rejects a project missing an English translation', () => {
  expect(() => projectSchema.parse({ slug: 'x', translations: { es: {} } })).toThrow();
});

test('requires a gallery and outcome for a full case study', () => {
  expect(() =>
    projectSchema.parse({
      slug: 'complete-case',
      order: 1,
      featured: true,
      caseStudy: true,
      year: '2026',
      disciplines: ['Design'],
      technologies: ['Astro'],
      image: '/images/projects/example.jpg',
      liveUrl: null,
      translations: {
        es: {
          title: 'Caso',
          summary: 'Resumen',
          challenge: 'Reto',
          role: 'Rol',
          solution: 'Solución',
          alt: 'Imagen',
          unavailableLinkLabel: 'No disponible',
          decisions: ['Decisión'],
        },
        en: {
          title: 'Case',
          summary: 'Summary',
          challenge: 'Challenge',
          role: 'Role',
          solution: 'Solution',
          alt: 'Image',
          unavailableLinkLabel: 'Unavailable',
          decisions: ['Decision'],
        },
      },
    }),
  ).toThrow();
});
