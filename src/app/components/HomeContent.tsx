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
