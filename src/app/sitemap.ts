import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';
import { getProjects } from '@/services/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { data, error } = await getProjects({
		select: 'fields.slug,fields.name',
	});

	if (error) {
		console.error(error);

		return [];
	}

	if (!data) {
		return [];
	}

	const { projects } = data;

	return [
		{
			changeFrequency: 'monthly',
			lastModified: new Date(),
			priority: 1,
			url: BASE_URL,
		},
		...projects.map((project) => ({
			changeFrequency:
				'monthly' as MetadataRoute.Sitemap[number]['changeFrequency'],
			lastModified: new Date(),
			priority: 0.5,
			url: `${BASE_URL}/projects/${project.slug}`,
		})),
	];
}
