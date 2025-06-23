'use server';

import { notFound } from 'next/navigation';
import ProjectContent from '@/components/ProjectContent';
import { getProjects } from '@/services/projects';

interface ProjectServerComponentProps {
	mode: 'page' | 'modal';
	slug: string;
}

export default async function ProjectServerComponent({
	mode,
	slug,
}: ProjectServerComponentProps) {
	const { data, error } = await getProjects({ slug });

	if (error) {
		console.error(error);

		return null;
	}

	if (!data) {
		return null;
	}

	const { projects } = data;

	if (projects.length === 0) {
		notFound();
	}

	return <ProjectContent mode={mode} project={projects[0]} />;
}
