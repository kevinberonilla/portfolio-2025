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
					'invisible absolute flex w-full items-center justify-between gap-6 p-8',
					projectGalleryLoaded && 'visible'
				)}
			>
				<Logo className="text-foreground h-6 w-auto" />
				<ThemeSwitch />
			</header>
			<main>
				<section
					className={cn(
						'invisible h-dvh min-h-[32rem] bg-gray-50 bg-gradient-to-br from-indigo-700/10 to-orange-800/20 dark:bg-slate-900 dark:from-stone-900/10',
						projectGalleryLoaded && 'visible'
					)}
				>
					<div className="flex h-full items-center justify-center">
						<div className="flex max-w-xl flex-col gap-6 p-8">
							<h1 className="font-serif text-4xl leading-tight font-normal">
								👋 My name is{' '}
								<span className="text-primary">
									Kevin Beronilla
								</span>{' '}
								and I create visual experiences.
							</h1>
							<p className="text-md leading-relaxed">
								I&apos;m a full-stack software engineer with a
								background in graphic design, and my mission is
								to help others share knowledge and tell stories
								through visual media. When I&apos;m not in front
								of a computer, you can find me tinkering on cars
								or lounging with animals.
							</p>
							<div className="flex flex-col gap-3">
								<p className="text-sm font-bold">
									Interested in learning more? View my:
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
						</div>
					</div>
				</section>
				<section>
					<ProjectGallery
						className={cn(
							'transition-margin -mt-[100vh] duration-400',
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
