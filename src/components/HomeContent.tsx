'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { FiFileText, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Project } from '@/app/services/projects';
import Logo from '@/components/Logo';
import ProjectGallery from '@/components/ProjectGallery';
import ThemeSwitch from '@/components/ThemeSwitch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HomeContentProps {
	categories: string[];
	projects: Project[];
}

export default function HomeContent({
	categories,
	projects,
}: HomeContentProps) {
	const [projectGalleryLoaded, setProjectGalleryLoaded] = useState(false);

	const handleAllThumbnailsLoaded = useCallback(() => {
		window.setTimeout(() => {
			setProjectGalleryLoaded(true);
		}, 400);
	}, []);

	return (
		<>
			<header
				className={cn(
					'invisible absolute z-10 flex w-full items-center justify-between gap-6 p-8',
					projectGalleryLoaded && 'visible'
				)}
			>
				<Logo className="text-foreground h-7 w-auto" />
				<ThemeSwitch />
			</header>
			<main>
				<section
					className={cn(
						'invisible flex h-[45rem] items-center justify-center overflow-hidden blur-md transition-[filter] duration-800',
						'bg-gray-50 bg-gradient-to-br from-sky-100/20 to-orange-600/10 dark:bg-slate-900/60 dark:from-stone-900/10 dark:to-orange-800/20',
						projectGalleryLoaded && 'visible blur-none'
					)}
				>
					<div
						className={cn(
							'flex max-w-xl scale-110 flex-col gap-6 p-8 transition-transform duration-800',
							projectGalleryLoaded && 'scale-100'
						)}
					>
						<h1 className="font-serif text-4xl leading-tight font-normal">
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
						<p className="text-md leading-relaxed">
							I&apos;m a full-stack software engineer with a
							background in graphic design, and my mission is to
							help others share knowledge and tell stories through
							visual media. When I&apos;m not in front of a
							computer, you can find me tinkering on cars or
							lounging with animals.
						</p>
						<div className="flex items-center gap-2">
							<Button
								asChild
								className="cursor-pointer bg-amber-600 text-shadow-black/20 text-shadow-md hover:bg-amber-700"
							>
								<Link href="/downloads/kevin-beronilla-resume.pdf">
									<FiFileText className="drop-shadow-xs drop-shadow-black/60" />
									Resume
								</Link>
							</Button>
							<Button
								asChild
								className="cursor-pointer bg-sky-700 text-shadow-black/20 text-shadow-md hover:bg-sky-800"
							>
								<Link href="https://www.linkedin.com/in/kevinberonilla/">
									<FiLinkedin className="drop-shadow-xs drop-shadow-black/60" />
									LinkedIn
								</Link>
							</Button>
							<Button
								asChild
								className="cursor-pointer bg-zinc-700 text-shadow-black/20 text-shadow-md hover:bg-zinc-800"
							>
								<Link href="https://github.com/kevinberonilla">
									<FiGithub className="drop-shadow-xs drop-shadow-black/60" />
									GitHub
								</Link>
							</Button>
						</div>
					</div>
				</section>
				<section>
					<ProjectGallery
						className={cn(
							'relative z-10 -mt-[45rem] transition-all duration-800',
							projectGalleryLoaded && 'mt-0'
						)}
						loaded={projectGalleryLoaded}
						onAllThumbnailsLoaded={handleAllThumbnailsLoaded}
						projects={projects}
					/>
				</section>
				<div>
					Categories:
					{JSON.stringify(categories)}
				</div>
			</main>
		</>
	);
}
