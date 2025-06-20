'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselProps {
	className?: string;
	images: string[];
	videos: string[];
}

export default function Carousel({
	className = '',
	images = [],
	videos = [],
}: CarouselProps) {
	const carousel = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const back = useCallback(() => {
		if (activeIndex === 0) {
			if (carousel.current) {
				carousel.current.scrollLeft =
					carousel.current.clientWidth *
					(images.length + videos.length - 1);
			}
		} else {
			if (carousel.current) {
				carousel.current.scrollLeft -= carousel.current.clientWidth;
			}
		}
	}, [activeIndex, images.length, videos.length]);

	const next = useCallback(() => {
		if (activeIndex === images.length + videos.length - 1) {
			if (carousel.current) {
				carousel.current.scrollLeft = 0;
			}
		} else {
			if (carousel.current) {
				carousel.current.scrollLeft += carousel.current.clientWidth;
			}
		}
	}, [activeIndex, images.length, videos.length]);

	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				back();
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				next();
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [back, next]);

	function handleCarouselScroll() {
		if (carousel.current) {
			setActiveIndex(
				Math.round(
					carousel.current.scrollLeft / carousel.current.clientWidth
				)
			);
		}
	}

	function handleNavigationClick(event: MouseEvent<HTMLButtonElement>) {
		const index = parseInt(event.currentTarget.dataset.index ?? '0', 10);

		if (carousel.current) {
			carousel.current.scrollLeft = carousel.current.clientWidth * index;
		}
	}

	return (
		<div className={cn('group/carousel relative', className)}>
			<div
				className="no-scrollbar w-full snap-x snap-mandatory snap-always overflow-x-auto scroll-smooth"
				onScroll={handleCarouselScroll}
				ref={carousel}
				tabIndex={-1}
			>
				<div className="*:basis-screen-xl flex flex-nowrap *:shrink-0 *:snap-start">
					{images.length > 0 &&
						images.map((image) => {
							return (
								<Image
									alt=""
									className="aspect-3/2 w-full max-w-screen-lg"
									height={800}
									key={image}
									src={image}
									tabIndex={-1}
									width={1200}
								/>
							);
						})}
					{videos.length > 0 &&
						videos.map((video, videoIndex) => {
							return (
								<div
									className="bg-background relative aspect-16/9 w-full max-w-screen-lg"
									key={video}
									tabIndex={-1}
								>
									<iframe
										allowFullScreen
										className="size-full bg-transparent"
										src={video}
										title={'Video ' + (videoIndex + 1)}
									/>
								</div>
							);
						})}
				</div>
			</div>
			{images.length + videos.length > 1 && (
				<>
					<div className="border-input absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/20 p-2">
						{(images || [])
							.concat(videos || [])
							.map((slide, slideIndex) => {
								return (
									<button
										className={cn(
											'size-2 cursor-pointer rounded-full bg-white hover:opacity-50',
											slideIndex === activeIndex &&
												'bg-primary hover:opacity-100'
										)}
										data-index={slideIndex}
										key={slide}
										onClick={handleNavigationClick}
										type="button"
									/>
								);
							})}
					</div>
					<Button
						className={cn(
							'absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer border-none opacity-0 transition-all duration-200 group-hover/carousel:opacity-100',
							'bg-black/20 text-white hover:bg-black/30 hover:text-white focus:opacity-100 dark:bg-black/20 dark:hover:bg-black/30'
						)}
						onClick={back}
						size="icon"
						type="button"
						variant="outline"
					>
						<FiChevronLeft />
						<span className="sr-only">Back</span>
					</Button>
					<Button
						className={cn(
							'absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer border-none opacity-0 transition-all duration-200 group-hover/carousel:opacity-100',
							'bg-black/20 text-white hover:bg-black/30 hover:text-white focus:opacity-100 dark:bg-black/20 dark:hover:bg-black/30'
						)}
						onClick={next}
						size="icon"
						type="button"
						variant="outline"
					>
						<FiChevronRight />
						<span className="sr-only">Next</span>
					</Button>
				</>
			)}
		</div>
	);
}
