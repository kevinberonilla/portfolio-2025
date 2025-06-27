import { Metadata } from 'next';
import { Suspense } from 'react';
import { FiLoader } from 'react-icons/fi';
import Header from '@/components/Header';
import ProjectServerComponent from '@/components/ProjectServerComponent';
import { SITE_TITLE, SITE_URL } from '@/lib/constants';
import { getCtaButtons } from '@/lib/utils';
import { getProjects } from '@/services/projects';

interface ProjectPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;

	const { data, error } = await getProjects({ select: 'fields.name', slug });

	if (error || !data) {
		return {
			alternates: {
				canonical: `${SITE_URL}/projects/${slug}`,
			},
		};
	}

	const { projects } = data;
	const project = projects[0];

	return {
		alternates: {
			canonical: `${SITE_URL}/projects/${slug}`,
		},
		title: `${project.name} | ${SITE_TITLE}`,
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;

	return (
		<Suspense
			fallback={
				<div className="flex h-dvh w-dvw items-center justify-center">
					<FiLoader className="text-primary size-12 animate-spin opacity-30 dark:opacity-20" />
				</div>
			}
		>
			<div className="flex h-dvh flex-col">
				<Header buttons={getCtaButtons(true)} />
				<ProjectServerComponent mode="page" slug={slug} />
			</div>
		</Suspense>
	);
}
