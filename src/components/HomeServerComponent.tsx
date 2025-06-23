'use server';

import HomeContent from '@/components/HomeContent';
import { getProjects } from '@/services/projects';

export default async function HomeServerComponent() {
	const { data, error } = await getProjects();

	if (error) {
		console.error(error);

		return null;
	}

	if (!data) {
		return null;
	}

	const { projects } = data;

	return <HomeContent projects={projects} />;
}
