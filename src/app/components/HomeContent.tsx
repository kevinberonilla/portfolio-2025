'use client';

import { Asset } from 'contentful-management';
import { Project } from '../services/projects';

interface HomeContentProps {
	assets: Asset[];
	projects: Project[];
}

export default function HomeContent({ assets, projects }: HomeContentProps) {
	return (
		<div>
			<h1 className="text-4xl font-bold font-serif">Kevin Beronilla</h1>
			<h2 className="text-2xl font-bold">Software Engineer</h2>
			<p>
				Kevin Beronilla is a software engineer with a passion for
				building web applications.
			</p>
			<p></p>
			<div>
				Assets:
				{JSON.stringify(assets)}
			</div>
			<hr />
			<div>
				Projects:
				{JSON.stringify(projects)}
			</div>
		</div>
	);
}
