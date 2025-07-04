'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Project } from '@/services/projects';

interface ProjectGalleryProps {
	className?: string;
	disabled?: boolean;
	loaded: boolean;
	onAllThumbnailsLoaded: () => void;
	projects: Pick<Project, 'categories' | 'name' | 'slug' | 'thumbnailUrl'>[];
}

export default function ProjectGallery({
	className,
	disabled = false,
	loaded = false,
	onAllThumbnailsLoaded,
	projects,
}: ProjectGalleryProps) {
	const tileRefs = useRef<HTMLLIElement[]>([]);
	const [thumbnailsLoaded, setThumbnailsLoaded] = useState(
		projects.reduce(
			(acc, project) => {
				acc[project.slug] = false;

				return acc;
			},
			{} as Record<string, boolean>
		)
	);

	const totalThumbnailsLoaded = useMemo(
		() => Object.values(thumbnailsLoaded).filter((loaded) => loaded).length,
		[thumbnailsLoaded]
	);

	const handleThumbnailLoad = useCallback(
		(event: SyntheticEvent<HTMLImageElement>) => {
			if (loaded) {
				return;
			}

			const loadedImage = event.currentTarget;

			window.setTimeout(() => {
				setThumbnailsLoaded((prevState) => {
					const newState = { ...prevState };

					newState[loadedImage.dataset.slug as string] = true;

					return newState;
				});
			}, Math.random() * 500);
		},
		[loaded]
	);

	useEffect(() => {
		if (!loaded && totalThumbnailsLoaded === projects.length) {
			onAllThumbnailsLoaded?.();
		}
	}, [loaded, onAllThumbnailsLoaded, projects.length, totalThumbnailsLoaded]);

	return (
		<ul
			className={cn(
				'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
				className
			)}
		>
			{projects.map((project, projectIndex) => {
				const thumbnailLoaded = thumbnailsLoaded[project.slug];

				return (
					<li
						className="group/tile relative block aspect-3/2 overflow-hidden"
						key={project.name}
						ref={(el) => {
							if (el) {
								tileRefs.current[projectIndex] = el;
							}
						}}
					>
						<Link
							className={cn(
								'block size-full translate-y-[calc(100%_+_1rem)] cursor-pointer text-left transition-transform duration-200',
								thumbnailLoaded && 'translate-y-0'
							)}
							href={`/projects/${project.slug}`}
							onClick={(event) => {
								if (disabled) {
									event.preventDefault();
								}
							}}
							onTouchStart={(event) => {
								event.currentTarget.focus();
							}}
							tabIndex={disabled ? -1 : 0}
						>
							<Image
								alt={project.name}
								className={cn(
									'size-full origin-center scale-101 object-cover transition-transform duration-200',
									'group-focus-within/tile:scale-110 group-focus-within/tile:blur-xs',
									'group-hover/tile:scale-110 group-hover/tile:blur-xs'
								)}
								data-slug={project.slug}
								height={400}
								loading="eager"
								onLoad={handleThumbnailLoad}
								src={project.thumbnailUrl}
								width={600}
							/>
							<span
								className={cn(
									'bg-background/80 absolute -inset-1 z-10 flex flex-col gap-1 p-8',
									'opacity-0 transition-opacity duration-200',
									'*:-translate-x-2 *:opacity-0 *:transition-[opacity,translate]',
									'group-focus-within/tile:opacity-100 group-focus-within/tile:*:translate-x-0 group-focus-within/tile:*:opacity-100',
									'group-hover/tile:opacity-100 group-hover/tile:*:translate-x-0 group-hover/tile:*:opacity-100'
								)}
							>
								<h2 className="text-base leading-tight font-bold delay-100 sm:text-lg">
									{project.name}
								</h2>
								<ul className="flex flex-wrap gap-1 delay-150 max-sm:hidden">
									{project.categories.map((category) => {
										return (
											<li key={category}>
												<Badge className="bg-muted-foreground/20 text-foreground rounded-xs capitalize">
													{category}
												</Badge>
											</li>
										);
									})}
								</ul>
								<div className="text-primary flex items-center gap-1 text-xs font-bold delay-200 sm:mt-auto">
									View Project
									<FiArrowRight className="size-3" />
								</div>
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
