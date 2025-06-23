import ProjectServerComponent from '@/components/ProjectServerComponent';

interface ProjectPageProps {
	params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;

	return <ProjectServerComponent mode="modal" slug={slug} />;
}
