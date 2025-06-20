'use client';

import { useRef, useState } from 'react';
import { FiFileText, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { Project } from '@/app/services/projects';
import CallsToAction, { CallToAction } from '@/components/CallsToAction';
import Logo from '@/components/Logo';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectModal from '@/components/ProjectModal';
import ThemeSwitch from '@/components/ThemeSwitch';
import { cn } from '@/lib/utils';

interface HomeContentProps {
	categories: string[];
	projects: Project[];
}

const getCtaButtons = (header = false): CallToAction[] => [
	{
		ariaLabel: 'View my resume',
		className: 'bg-amber-600 hover:bg-amber-700',
		href: '/downloads/kevin-beronilla-resume.pdf',
		icon: (
			<FiFileText
				className={cn(
					'drop-shadow-xs drop-shadow-black/60',
					header && 'size-3'
				)}
			/>
		),
		label: 'Resume',
	},
	{
		ariaLabel: 'View my LinkedIn profile',
		className: 'bg-sky-700 hover:bg-sky-800',
		href: 'https://www.linkedin.com/in/kevinberonilla/',
		icon: (
			<FiLinkedin
				className={cn(
					'drop-shadow-xs drop-shadow-black/60',
					header && 'size-3'
				)}
			/>
		),
		label: 'LinkedIn',
	},
	{
		ariaLabel: 'View my GitHub profile',
		className: 'bg-zinc-700 hover:bg-zinc-800',
		href: 'https://github.com/kevinberonilla',
		icon: (
			<FiGithub
				className={cn(
					'drop-shadow-xs drop-shadow-black/60',
					header && 'size-3'
				)}
			/>
		),
		label: 'GitHub',
	},
];

export default function HomeContent({
	categories,
	projects,
}: HomeContentProps) {
	const { inView: ctaInView, ref: ctaRef } = useInView({
		initialInView: false,
		threshold: 1,
	});
	const [projectGalleryLoaded, setProjectGalleryLoaded] = useState(false);
	const [projectGalleryEnabled, setProjectGalleryEnabled] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null
	);
	const selectedProjectTileRef = useRef<HTMLLIElement | null>(null);
	const projectShown = !!(selectedProject && selectedProjectTileRef.current);

	const handleAllThumbnailsLoaded = () => {
		window.setTimeout(() => {
			setProjectGalleryLoaded(true);

			window.setTimeout(() => {
				setProjectGalleryEnabled(true);
			}, 800);
		}, 400);
	};

	const handleProjectClick = (
		project: Project,
		tileElement: HTMLLIElement
	) => {
		setSelectedProject(project);
		selectedProjectTileRef.current = tileElement;
		document.body.style.overflow = 'hidden';
	};

	const handleProjectModalClose = () => {
		setSelectedProject(null);
		selectedProjectTileRef.current = null;
		document.body.style.overflow = '';
	};

	const handleLogoClick = () => {
		handleProjectModalClose();
		window.scrollTo({ behavior: 'smooth', top: 0 });
	};

	return (
		<>
			<header className="bg-background sticky top-0 z-20 flex w-full items-center justify-between gap-6 p-8">
				<Logo
					className="text-foreground h-6 w-auto cursor-pointer"
					onClick={handleLogoClick}
				/>
				<div className="flex items-center gap-6">
					<CallsToAction
						buttons={getCtaButtons(true)}
						className={cn(
							'pointer-events-none gap-1 overflow-hidden p-1 *:translate-y-full *:opacity-0 *:transition-all *:duration-200 sm:gap-2',
							((!ctaInView && projectGalleryEnabled) ||
								selectedProject) &&
								'pointer-events-auto *:translate-y-0 *:opacity-100'
						)}
						header
					/>
					<ThemeSwitch />
				</div>
			</header>
			<main>
				<section
					className={cn(
						'invisible flex h-[32rem] items-center justify-center overflow-hidden transition-none duration-800 md:h-[42rem]',
						'bg-gray-600 bg-gradient-to-br from-blue-200/20 to-rose-400/10 dark:bg-slate-950/30 dark:from-stone-900/30 dark:to-orange-800/20',
						projectGalleryLoaded && 'visible'
					)}
				>
					<div
						className={cn(
							'flex max-w-xl scale-110 flex-col gap-6 p-8 transition-transform duration-800 ease-in-out',
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
						<CallsToAction
							buttons={getCtaButtons()}
							disabled={projectShown}
							ref={ctaRef}
						/>
					</div>
				</section>
				<section>
					<ProjectGallery
						className={cn(
							'pointer-events-none relative z-10 -mt-[32rem] transition-all duration-800 md:-mt-[42rem]',
							projectGalleryLoaded && 'mt-0 md:mt-0',
							projectGalleryEnabled && 'pointer-events-auto'
						)}
						disabled={projectShown}
						loaded={projectGalleryLoaded}
						onAllThumbnailsLoaded={handleAllThumbnailsLoaded}
						onProjectClick={handleProjectClick}
						projects={projects}
					/>
				</section>
				{projectShown && (
					<ProjectModal
						onClose={handleProjectModalClose}
						project={selectedProject}
						tileElementRef={selectedProjectTileRef}
					/>
				)}
				<div>
					Categories:
					{JSON.stringify(categories)}
				</div>
			</main>
		</>
	);
}
