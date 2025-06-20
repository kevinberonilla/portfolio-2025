'use server';

import { getProjects } from '@/app/services/projects';
import HomeContent from '@/components/HomeContent';

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
