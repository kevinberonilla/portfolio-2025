import { Suspense } from 'react';
import { FiLoader } from 'react-icons/fi';
import Header from '@/components/Header';
import ProjectServerComponent from '@/components/ProjectServerComponent';
import { getCtaButtons } from '@/lib/utils';

interface ProjectPageProps {
	params: Promise<{ slug: string }>;
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
