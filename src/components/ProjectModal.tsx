'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RefObject, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Project } from '@/app/services/projects';
import Carousel from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
	onClose: () => void;
	project: Project;
	tileElementRef: RefObject<HTMLLIElement | null>;
}

export default function ProjectModal({
	onClose,
	project,
	tileElementRef,
}: ProjectModalProps) {
	const [mounted, setMounted] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);
	const tileElementBox = tileElementRef.current?.getBoundingClientRect();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		});

		setMounted(true);

		window.setTimeout(() => {
			setFullScreen(true);
		}, 300);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	return (
		<div
			className={cn(
				'bg-background fixed top-24 left-0 z-50 h-[calc(100dvh_-_6rem)] w-full overflow-hidden transition-[height,width,top,left] duration-300'
			)}
			{...(mounted
				? {}
				: {
						style: {
							height: tileElementBox?.height,
							left: tileElementBox?.left,
							top: tileElementBox?.top,
							width: tileElementBox?.width,
						},
					})}
		>
			<Image
				alt={project.name}
				className={cn(
					'size-full origin-center scale-110 object-cover blur-xs',
					mounted && 'blur-lg'
				)}
				data-slug={project.slug}
				height={400}
				src={project.thumbnailUrl}
				width={600}
			/>
			<div className="bg-background/80 absolute inset-0 z-10 overflow-y-auto p-8" />
			<div className="absolute inset-0 z-10 overflow-y-auto p-8">
				<div
					className={cn(
						'mx-auto flex w-full max-w-screen-lg flex-col gap-8 opacity-0 transition-opacity duration-300',
						fullScreen && 'opacity-100'
					)}
				>
					<div className="flex justify-between gap-8">
						<h2 className="text-2xl font-bold md:text-3xl">
							{project.name}
						</h2>
						<Button
							aria-label="Close"
							className="text-foreground cursor-pointer"
							onClick={onClose}
							size="icon"
							variant="outline"
						>
							<FiX />
							<span className="sr-only">Close</span>
						</Button>
					</div>
					<ul className="flex flex-wrap gap-8">
						<li className="flex flex-col gap-1">
							<p className="text-xs font-bold">
								Year{project.startYear ? 's' : null}
							</p>
							<p className="text-sm">
								{project.startYear
									? project.startYear + '—' + project.endYear
									: project.endYear}
							</p>
						</li>
						<li className="flex flex-col gap-1">
							<p className="text-xs font-bold">Project Owner</p>
							<p className="text-sm">{project.owner}</p>
						</li>
						{project.recognition && (
							<li className="flex flex-col gap-1">
								<p className="text-xs font-bold">Recognition</p>
								<p className="text-sm">{project.recognition}</p>
							</li>
						)}
						{(project.githubRepository ||
							project.liveSite ||
							project.appExchangeListing) && (
							<li className="flex flex-col gap-1">
								<p className="text-xs font-bold">Links</p>
								<ul className="flex gap-1 *:[:not(:last-child)]:after:content-[',']">
									{project.githubRepository && (
										<li>
											<Link
												className="text-primary text-sm hover:text-amber-700"
												href={project.githubRepository}
												rel="noreferrer"
												target="_blank"
											>
												GitHub Repository
											</Link>
										</li>
									)}
									{project.liveSite && (
										<li>
											<Link
												className="text-primary text-sm hover:text-amber-700"
												href={project.liveSite}
												rel="noreferrer"
												target="_blank"
											>
												Live Site
											</Link>
										</li>
									)}
									{project.appExchangeListing && (
										<li>
											<Link
												className="text-primary text-sm hover:text-amber-700"
												href={
													project.appExchangeListing
												}
												rel="noreferrer"
												target="_blank"
											>
												AppExchange Listing
											</Link>
										</li>
									)}
								</ul>
							</li>
						)}
						<li className="flex flex-col gap-1">
							<p className="text-xs font-bold">Contributions</p>
							<p className="text-sm">{project.contributions}</p>
						</li>
					</ul>
					<Carousel
						images={project.imageUrls ?? []}
						videos={project.videos ?? []}
					/>
				</div>
			</div>
		</div>
	);
}
