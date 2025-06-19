import Image from 'next/image';
import Link from 'next/link';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Project } from '@/app/services/projects';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectGalleryProps {
	className?: string;
	loaded: boolean;
	onAllThumbnailsLoaded?: () => void;
	projects: Project[];
}

export default function ProjectGallery({
	className,
	loaded = false,
	onAllThumbnailsLoaded,
	projects,
}: ProjectGalleryProps) {
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

	useEffect(() => {
		if (!loaded && totalThumbnailsLoaded === projects.length) {
			onAllThumbnailsLoaded?.();
		}
	}, [loaded, onAllThumbnailsLoaded, projects.length, totalThumbnailsLoaded]);

	function handleThumbnailLoad(event: SyntheticEvent<HTMLImageElement>) {
		const loadedImage = event.currentTarget;

		if (!loaded) {
			window.setTimeout(() => {
				setThumbnailsLoaded((prevState) => {
					const newState = { ...prevState };

					newState[loadedImage.dataset.slug as string] = true;

					return newState;
				});
			}, Math.random() * 500);
		}
	}

	return (
		<ul
			className={cn(
				'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
				className
			)}
		>
			{projects.map((project) => {
				const thumbnailLoaded = thumbnailsLoaded[project.slug];

				return (
					<li
						className={cn(
							'group/tile pointer-events-none relative block aspect-3/2 overflow-hidden',
							loaded && 'pointer-events-auto'
						)}
						key={project.name}
					>
						<Link
							className={cn(
								'block translate-y-[calc(100%_+_1rem)] transition-all duration-200',
								thumbnailLoaded && 'translate-y-0'
							)}
							href={`/projects/${project.slug}`}
						>
							<Image
								alt={project.name}
								className="size-full origin-center transition-all duration-200 group-hover/tile:scale-110 group-hover/tile:blur-xs"
								data-slug={project.slug}
								height={400}
								onLoad={handleThumbnailLoad}
								src={project.thumbnailUrl}
								width={600}
							/>
							<span className="absolute inset-0 z-10 flex w-full flex-col gap-3 bg-rose-50/90 p-8 opacity-0 transition-all duration-200 group-hover/tile:opacity-100 dark:bg-gray-950/80">
								<h3 className="text-primary -translate-x-2 text-lg leading-tight font-bold opacity-0 transition-all delay-100 duration-200 group-hover/tile:translate-x-0 group-hover/tile:opacity-100">
									{project.name}
								</h3>
								<ul className="flex -translate-x-2 flex-wrap gap-1 opacity-0 transition-all delay-150 duration-200 group-hover/tile:translate-x-0 group-hover/tile:opacity-100">
									{project.categories.map((category) => {
										return (
											<li key={category}>
												<Badge
													className="bg-muted-foreground/10 rounded-xs capitalize"
													variant="outline"
												>
													{category}
												</Badge>
											</li>
										);
									})}
								</ul>
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
