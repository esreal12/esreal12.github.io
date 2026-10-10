import type { CollectionEntry } from 'astro:content';

export type ProjectRecord = CollectionEntry<'projects'>['data'];

export function getOrderedProjects(projects: ProjectRecord[]): ProjectRecord[] {
  return [...projects].sort((first, second) => first.order - second.order);
}

export function getFeaturedProjects(projects: ProjectRecord[]): ProjectRecord[] {
  return getOrderedProjects(projects).filter((project) => project.featured);
}

export function getProjectBySlug(
  projects: ProjectRecord[],
  slug: string,
): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getLiveLink(project: Pick<ProjectRecord, 'liveUrl'>): string | null {
  return project.liveUrl;
}
