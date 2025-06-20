'use client';

import FocusTrap from 'focus-trap-react';
import Image from 'next/image';
import { RefObject, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Project } from '@/app/services/projects';
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
		<FocusTrap>
			<div
				className={cn(
					'bg-background fixed top-24 left-0 z-50 h-full w-full overflow-hidden transition-all duration-300'
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
				<div className="absolute inset-0 z-10 bg-white/85 p-8 dark:bg-black/80">
					<div
						className={cn(
							'opacity-0 transition-opacity duration-300',
							fullScreen && 'opacity-100'
						)}
					>
						<div className="flex justify-between gap-8">
							<h2 className="text-2xl font-bold md:text-3xl">
								{project.name}
							</h2>
							<Button
								className="text-foreground cursor-pointer"
								onClick={onClose}
								size="icon"
								variant="outline"
							>
								<FiX />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</FocusTrap>
	);
}
