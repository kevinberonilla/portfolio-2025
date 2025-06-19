import Image from 'next/image';
import { MouseEvent, SyntheticEvent, useState } from 'react';
import { Project } from '@/app/services/projects';

interface ProjectGalleryProps {
	isMediumScreen?: boolean;
	loaded?: boolean;
	projects: Project[];
}

export default function ProjectGallery({
	loaded = false,
	projects = [],
}: ProjectGalleryProps) {
	const [_totalThumbnailsLoaded, setTotalThumbnailsLoaded] = useState(0);

	function handleThumbnailLoad(event: SyntheticEvent<HTMLImageElement>) {
		const loadedImage = event.currentTarget;

		if (!loaded) {
			window.setTimeout(() => {
				loadedImage
					.closest('.kb-project-gallery__project')
					?.classList.add('kb-project-gallery__project--loaded');

				setTotalThumbnailsLoaded((prevState) => prevState + 1);
			}, Math.random() * 500);
		}
	}

	function handleProjectClick(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();

		const projectIndex = parseInt(
			event.currentTarget?.dataset.index ?? '0',
			10
		);
		const targetProject = projects[projectIndex];
		const newDocumentTitle = `${targetProject.name} | Kevin Beronilla`;

		window.document.title = newDocumentTitle;
		window.history.replaceState(
			null,
			newDocumentTitle,
			window.location.pathname + targetProject.hash
		);
	}

	return (
		<>
			<div>
				<ul className="grid grid-cols-4">
					{projects.map((project, projectIndex) => {
						return (
							<li key={project.name}>
								<a
									data-index={projectIndex}
									href={project.hash}
									onClick={handleProjectClick}
								>
									<Image
										alt={project.name}
										height={400}
										onLoad={handleThumbnailLoad}
										src={project.thumbnailUrl}
										width={600}
									/>
									<span className="kb-project-gallery__hover-tile">
										<span className="kb-project-gallery__name kb-m-around--none">
											{project.name}
										</span>
										<ul className="kb-project-gallery__tags kb-text-transform--capitalize">
											{project.categories.map(
												(category) => {
													return (
														<li key={category}>
															{category}
														</li>
													);
												}
											)}
										</ul>
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}
