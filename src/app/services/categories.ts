import { ProjectEntry } from './projects';

export function buildCategories(projects: ProjectEntry[]): string[] {
	const categorySet = new Set<string>();

	projects.forEach((project) =>
		project.fields.categories.forEach((category) =>
			categorySet.add(category)
		)
	);

	return Array.from(categorySet);
}
