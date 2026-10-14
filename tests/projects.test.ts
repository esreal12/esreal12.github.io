import { expect, test } from 'vitest';
import portfolioProjects from '../src/content/projects.json';
import {
  getFeaturedProjects,
  getOrderedProjects,
  getProjectBySlug,
} from '../src/lib/projects';
import type { ProjectRecord } from '../src/lib/projects';

const records = [
  { slug: 'later', order: 2, featured: false },
  { slug: 'first', order: 1, featured: true },
] as unknown as ProjectRecord[];

test('orders project records by ascending order without mutating input', () => {
  const ordered = getOrderedProjects(records);

  expect(ordered.map((item) => item.order)).toEqual([1, 2]);
  expect(records.map((item) => item.order)).toEqual([2, 1]);
});

test('returns only featured project records', () => {
  expect(getFeaturedProjects(records).map((item) => item.slug)).toEqual(['first']);
});

test('returns undefined for an unknown slug', () => {
  expect(getProjectBySlug(records, 'missing')).toBeUndefined();
});

test('lists the implementation technologies used by the selected WordPress projects', () => {
  const technologiesFor = (slug: string) =>
    portfolioProjects.find((project) => project.slug === slug)?.technologies;

  expect(technologiesFor('asociacion-bancaria-costarricense')).toContain('Elementor');
  expect(technologiesFor('estructuras-sa')).toContain('Elementor');
  expect(technologiesFor('congero-technology-group')).toEqual(
    expect.arrayContaining(['Elementor', 'Photoshop']),
  );
  expect(technologiesFor('biophilia-park')).toEqual(
    expect.arrayContaining(['WordPress', 'Elementor', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Illustrator']),
  );
  expect(technologiesFor('raindrop-spa')).toEqual(
    expect.arrayContaining(['WordPress', 'Elementor', 'PHP', 'HTML', 'CSS', 'JavaScript']),
  );
});
