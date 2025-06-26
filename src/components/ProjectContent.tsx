'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	Fragment,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { FiX } from 'react-icons/fi';
import Carousel from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import { SITE_TITLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Project } from '@/services/projects';

interface ProjectContentProps {
	mode: 'page' | 'modal';
	project: Project;
	tileElementRef?: RefObject<HTMLLIElement | null>;
}

export default function ProjectContent({ mode, project }: ProjectContentProps) {
	const router = useRouter();
	const [mounted, setMounted] = useState(mode === 'page');
	const [enabled, setEnabled] = useState(mode === 'page');
	const tileElementBoxRef = useRef<DOMRect | undefined>(
		typeof window !== 'undefined'
			? window.document
					.querySelector(`li:has([data-slug="${project.slug}"])`)
					?.getBoundingClientRect()
			: undefined
	);

	const links = useMemo(
		() => [
			...(project.githubRepository
				? [
						{
							href: project.githubRepository,
							label: 'GitHub Repository',
						},
					]
				: []),
			...(project.liveSite
				? [
						{
							href: project.liveSite,
							label: 'Live Site',
						},
					]
				: []),
			...(project.appExchangeListing
				? [
						{
							href: project.appExchangeListing,
							label: 'AppExchange Listing',
						},
					]
				: []),
		],
		[project.githubRepository, project.liveSite, project.appExchangeListing]
	);

	const handleClose = useCallback(() => {
		if (mode === 'page') {
			router.push('/');
		} else {
			router.back();
		}
	}, [mode, router]);

	useEffect(() => {
		if (mode === 'page') {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		};

		window.document.title = `${project.name} - ${SITE_TITLE}`;
		window.document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);
		setMounted(true);

		window.setTimeout(() => {
			setEnabled(true);
		}, 300);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.document.body.style.overflow = '';
		};
	}, [handleClose, mode, project.name, project.slug]);

	return (
		<div
			className={cn(
				'relative overflow-hidden',
				mode === 'modal' &&
					'bg-background fixed top-[6.125rem] left-0 z-10 h-[calc(100dvh_-_6rem)] w-full transition-[height,width,top,left] duration-300 sm:top-[6.5rem]',
				mode === 'page' && 'flex-1'
			)}
			{...(!mounted &&
				tileElementBoxRef.current && {
					style: {
						height: tileElementBoxRef.current?.height,
						left: tileElementBoxRef.current?.left,
						top: tileElementBoxRef.current?.top,
						width: tileElementBoxRef.current?.width,
					},
				})}
		>
			<Image
				alt={project.name}
				className={cn(
					'size-full origin-center scale-110 object-cover blur-xs',
					mounted && 'blur-lg'
				)}
				height={400}
				src={project.thumbnailUrl}
				width={600}
			/>
			<div className="bg-background/80 absolute inset-0 z-10" />
			<div className="absolute inset-0 z-10 overflow-y-auto p-8">
				<div
					className={cn(
						'mx-auto flex w-full max-w-screen-lg flex-col gap-8 opacity-0 transition-opacity duration-300',
						enabled && 'opacity-100'
					)}
				>
					<div className="flex justify-between gap-8">
						<h2 className="text-2xl font-bold md:text-3xl">
							{project.name}
						</h2>
						<Button
							aria-label="Close"
							className="text-foreground -mb-1 cursor-pointer"
							onClick={handleClose}
							size="icon"
							variant="outline"
						>
							<FiX />
							<span className="sr-only">Close</span>
						</Button>
					</div>
					<ul className="flex flex-wrap gap-x-8 gap-y-6">
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
						{links.length > 0 && (
							<li className="flex flex-col gap-1">
								<p className="text-xs font-bold">Links</p>
								<p className="flex text-sm">
									{links.map((link, linkIndex) => (
										<Fragment key={link.label}>
											<Link
												className="text-primary hover:text-amber-700"
												href={link.href}
												rel="noreferrer"
												target="_blank"
											>
												{link.label}
											</Link>
											{linkIndex !== links.length - 1 && (
												<span className="mr-1">,</span>
											)}
										</Fragment>
									))}
								</p>
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
