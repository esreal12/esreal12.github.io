import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const galleryItemSchema = z.object({
  src: z.string().startsWith('/images/projects/'),
  alt: z.string().min(1),
  caption: z.string().min(1),
});

const translationSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  challenge: z.string().min(1),
  role: z.string().min(1),
  solution: z.string().min(1),
  alt: z.string().min(1),
  unavailableLinkLabel: z.string().min(1),
  decisions: z.array(z.string().min(1)).optional(),
  outcome: z.string().min(1).optional(),
  gallery: z.array(galleryItemSchema).min(1).optional(),
});

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    order: z.number().int().positive(),
    featured: z.boolean(),
    caseStudy: z.boolean(),
    year: z.string().min(1),
    disciplines: z.array(z.string().min(1)).min(1),
    technologies: z.array(z.string().min(1)).min(1),
    image: z.string().startsWith('/images/projects/'),
    liveUrl: z.url().nullable(),
    translations: z.object({
      es: translationSchema,
      en: translationSchema,
    }),
  })
  .superRefine((project, context) => {
    if (!project.caseStudy) return;

    for (const locale of ['es', 'en'] as const) {
      const translation = project.translations[locale];

      if (!translation.decisions?.length) {
        context.addIssue({
          code: 'custom',
          message: `Full case studies require decisions in ${locale}`,
          path: ['translations', locale, 'decisions'],
        });
      }

      if (!translation.outcome) {
        context.addIssue({
          code: 'custom',
          message: `Full case studies require an outcome in ${locale}`,
          path: ['translations', locale, 'outcome'],
        });
      }

      if (!translation.gallery?.length) {
        context.addIssue({
          code: 'custom',
          message: `Full case studies require a gallery in ${locale}`,
          path: ['translations', locale, 'gallery'],
        });
      }
    }
  });

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: projectSchema,
});

export const collections = { projects };
