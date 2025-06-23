'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CallsToAction from '@/components/CallsToAction';
import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import { bgGradient, cn, getCtaButtons } from '@/lib/utils';
import { Project } from '@/services/projects';

interface HomeContentProps {
	projects: Project[];
}

export default function HomeContent({ projects }: HomeContentProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { inView: ctaInView, ref: ctaRef } = useInView({
		initialInView: false,
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
						'invisible flex h-[32rem] items-center justify-center overflow-hidden transition-none duration-800 md:h-[42rem]',
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
									'mr-2 inline-block origin-bottom-right cursor-grab select-none',
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
							disabled={pathname !== '/'}
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
						disabled={pathname !== '/'}
						loaded={projectGalleryLoaded}
						onAllThumbnailsLoaded={handleAllThumbnailsLoaded}
						projects={projects}
					/>
				</section>
			</main>
			<footer className="bg-background text-muted-foreground p-8 text-xs">
				© 2025 Kevin Beronilla. All featured projects are copyrighted
				by the respective individuals and organizations of which they
				are a representation of.
			</footer>
		</>
	);
}
