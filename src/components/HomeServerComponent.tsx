'use server';

import { getProjects } from '@/app/services/projects';
import HomeContent from '@/components/HomeContent';

export default async function HomeServerComponent() {
	const { data, error } = await getProjects();

	if (error) {
		console.error(error);
		// TODO: Add error component
		return <div>Error: {JSON.stringify(error)}</div>;
	}

	if (!data) {
		// TODO: Add error component
		return <div>No data available</div>;
	}

	const { categories, projects } = data;

	return <HomeContent categories={categories} projects={projects} />;
}
