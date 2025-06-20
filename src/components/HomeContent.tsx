'use client';

import { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Project } from '@/app/services/projects';
import CallsToAction from '@/components/CallsToAction';
import Logo from '@/components/Logo';
import ProjectGallery from '@/components/ProjectGallery';
import ThemeSwitch from '@/components/ThemeSwitch';
import { cn } from '@/lib/utils';

interface HomeContentProps {
	categories: string[];
	projects: Project[];
}

export default function HomeContent({
	categories,
	projects,
}: HomeContentProps) {
	const { inView: ctaInView, ref: ctaRef } = useInView({ threshold: 1 });
	const [projectGalleryLoaded, setProjectGalleryLoaded] = useState(false);
	const [projectGalleryEnabled, setProjectGalleryEnabled] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null
	);
	const [selectedProjectRef, setSelectedProjectRef] =
		useState<HTMLLIElement | null>(null);

	const handleAllThumbnailsLoaded = useCallback(() => {
		window.setTimeout(() => {
			setProjectGalleryLoaded(true);

			window.setTimeout(() => {
				setProjectGalleryEnabled(true);
			}, 800);
		}, 400);
	}, []);

	const handleProjectClick = useCallback(
		(project: Project, ref: HTMLLIElement) => {
			setSelectedProject(project);
			setSelectedProjectRef(ref);
		}
	);

	return (
		<>
			<header className="bg-background sticky top-0 z-20 flex w-full items-center justify-between gap-6 p-8">
				<Logo className="text-foreground h-6 w-auto" />
				<div className="flex items-center gap-6">
					<CallsToAction
						className={cn(
							'pointer-events-none opacity-0 transition-opacity duration-400',
							((!ctaInView && projectGalleryEnabled) ||
								selectedProject) &&
								'pointer-events-auto opacity-100'
						)}
						header
					/>
					<ThemeSwitch />
				</div>
			</header>
			<main>
				<section
					className={cn(
						'invisible flex h-[32rem] items-center justify-center overflow-hidden blur-md transition-[filter] duration-800 md:h-[48rem]',
						'bg-gray-600 bg-gradient-to-br from-blue-200/20 to-rose-400/10 dark:bg-slate-950/30 dark:from-stone-900/30 dark:to-orange-800/20',
						projectGalleryLoaded && 'visible blur-none'
					)}
				>
					<div
						className={cn(
							'flex max-w-xl scale-110 flex-col gap-6 p-8 transition-transform duration-1000',
							projectGalleryLoaded && 'scale-100'
						)}
					>
						<h1 className="font-serif text-3xl leading-tight font-normal md:text-4xl">
							<span
								className={cn(
									'inline-block origin-bottom-right cursor-grab',
									projectGalleryLoaded && 'animate-wave'
								)}
							>
								👋
							</span>{' '}
							My name is{' '}
							<span className="text-primary">
								Kevin Beronilla
							</span>{' '}
							and I create visual experiences.
						</h1>
						<p className="md:text-md text-sm leading-relaxed">
							I&apos;m a full-stack engineer with a background in
							graphic design, and my mission is to provide
							innovative software and digital media solutions.
							When I&apos;m not in front of a computer, you can
							find me tinkering on cars or lounging with animals.
						</p>
						<CallsToAction ref={ctaRef} />
					</div>
				</section>
				<section>
					<ProjectGallery
						className={cn(
							'pointer-events-none relative z-10 -mt-[32rem] transition-all duration-800 md:-mt-[48rem]',
							projectGalleryLoaded && 'mt-0 md:mt-0',
							projectGalleryEnabled && 'pointer-events-auto'
						)}
						loaded={projectGalleryLoaded}
						onAllThumbnailsLoaded={handleAllThumbnailsLoaded}
						onProjectClick={handleProjectClick}
						projects={projects}
					/>
				</section>
				{selectedProject && selectedProjectRef && <div>test</div>}
				<div>
					Categories:
					{JSON.stringify(categories)}
				</div>
			</main>
		</>
	);
}
