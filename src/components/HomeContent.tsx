'use client';

import { cn } from '@/lib/utils';
import { Project } from '../app/services/projects';
import ThemeSwitch from './ThemeSwitch';

interface HomeContentProps {
	categories: string[];
	projects: Project[];
}

export default function HomeContent({
	categories,
	projects,
}: HomeContentProps) {
	return (
		<div className="text-muted-foreground">
			<ThemeSwitch />
			<section className="bg-gradient-to-r from-orange-50 to-slate-200 dark:from-orange-800 dark:to-slate-800">
				<h1 className={cn('text-4xl font-bold font-serif')}>
					👋 Hi! My name is{' '}
					<span className="text-orange-400">Kevin Beronilla</span> and
					I create visual experiences.
				</h1>
				<h2 className="text-2xl font-bold">Software Engineer</h2>
			</section>
			<p>
				Kevin Beronilla is a software engineer with a passion for
				building web applications.
			</p>
			<p></p>
			<div>
				Categories:
				{JSON.stringify(categories)}
			</div>
			<hr />
			<div>
				Projects:
				{JSON.stringify(projects)}
			</div>
		</div>
	);
}
