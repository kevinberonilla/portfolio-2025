'use client';

import { Project } from '@/app/services/projects';
import Logo from '@/components/Logo';
import ThemeSwitch from '@/components/ThemeSwitch';

interface HomeContentProps {
	categories: string[];
	projects: Project[];
}

export default function HomeContent({
	categories,
	projects,
}: HomeContentProps) {
	return (
		<>
			<header className="absolute flex w-full items-center justify-between gap-6 p-6">
				<Logo className="text-foreground h-6 w-auto" />
				<ThemeSwitch />
			</header>
			<main>
				<section className="bg-muted/50 h-dvh min-h-[32rem]">
					<div className="flex h-full items-center justify-center">
						<div className="flex max-w-lg flex-col gap-6">
							<h1 className="font-serif text-4xl leading-tight font-normal">
								👋 My name is{' '}
								<span className="text-orange-400">
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
						</div>
					</div>
				</section>
				<div>
					Categories:
					{JSON.stringify(categories)}
				</div>
				<hr />
				<div>
					Projects:
					{JSON.stringify(projects)}
				</div>
			</main>
		</>
	);
}
