'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CallsToAction from '@/components/CallsToAction';
import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import { bgGradient, cn, getCtaButtons } from '@/lib/utils';
import { Project } from '@/services/projects';

interface HomeContentProps {
	projects: Pick<Project, 'categories' | 'name' | 'slug' | 'thumbnailUrl'>[];
}

export default function HomeContent({ projects }: HomeContentProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { inView: ctaInView, ref: ctaRef } = useInView({
		fallbackInView: true,
		initialInView: true,
		rootMargin: '-60px 0px',
		threshold: 1,
	});
	const [projectGalleryLoaded, setProjectGalleryLoaded] = useState(false);
	const [projectGalleryEnabled, setProjectGalleryEnabled] = useState(false);

	const handleAllThumbnailsLoaded = useCallback(() => {
		window.setTimeout(() => {
			setProjectGalleryLoaded(true);

			window.setTimeout(() => {
				setProjectGalleryEnabled(true);
			}, 800);
		}, 400);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Header
				buttons={getCtaButtons(true)}
				className="sticky top-0 z-20"
				hideCtaButtons={
					(!projectGalleryEnabled || ctaInView) && pathname === '/'
				}
				onLogoClick={
					pathname === '/'
						? () => window.scrollTo({ behavior: 'smooth', top: 0 })
						: () => router.back()
				}
			/>
			<main>
				<section
					className={cn(
						'invisible flex h-[36rem] items-center justify-center overflow-hidden transition-none duration-800 md:h-[42rem]',
						bgGradient,
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
									'mr-2.5 inline-block origin-bottom-right cursor-grab select-none md:mr-4',
									projectGalleryLoaded && 'animate-wave'
								)}
							>
								👋
							</span>
							My name is{' '}
							<span className="text-primary">
								Kevin Beronilla
							</span>{' '}
							and I create visual experiences.
						</h1>
						<p className="text-sm leading-relaxed">
							I&apos;m a full-stack software engineer with a focus
							on front-end development and a background in graphic
							design. When I&apos;m not building innovative web
							solutions, you&apos;ll find me working on cars,
							playing online games, or lounging with my two cats.
						</p>
						<p className="text-sm leading-relaxed">
							If you&apos;re interested in learning more about my
							work, check out the resources and sample projects
							below.
						</p>
						<CallsToAction
							buttons={getCtaButtons()}
							disabled={pathname !== '/'}
							ref={ctaRef}
						/>
					</div>
				</section>
				<section>
					<ProjectGallery
						className={cn(
							'pointer-events-none relative z-10 -mt-[36rem] transition-all duration-800 md:-mt-[42rem]',
							projectGalleryLoaded && 'mt-0 md:mt-0',
							projectGalleryEnabled && 'pointer-events-auto'
						)}
						disabled={pathname !== '/'}
						loaded={projectGalleryLoaded}
						onAllThumbnailsLoaded={handleAllThumbnailsLoaded}
						projects={projects}
					/>
				</section>
			</main>
			<footer className="bg-background text-muted-foreground p-8 text-xs">
				© {new Date().getFullYear()} Kevin Beronilla. All featured
				projects are copyrighted by the respective individuals and
				organizations of which they are a representation of.
			</footer>
		</>
	);
}
