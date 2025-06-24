import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';
import { getProjects } from '@/services/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const homepage: MetadataRoute.Sitemap[number] = {
		changeFrequency: 'monthly',
		lastModified: new Date(),
		priority: 1,
		url: BASE_URL,
	};

	const { data, error } = await getProjects({
		select: 'fields.slug,fields.name',
	});

	if (error) {
		console.error(error);

		return [homepage];
	}

	if (!data) {
		return [homepage];
	}

	const { projects } = data;

	return [
		homepage,
		...projects.map(
			(project) =>
				({
					changeFrequency: 'monthly',
					lastModified: new Date(),
					priority: 0.5,
					url: `${BASE_URL}/projects/${project.slug}`,
				}) as MetadataRoute.Sitemap[number]
		),
	];
}
