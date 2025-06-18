'use server';

import { Suspense } from 'react';
import HomeServerComponent from './components/HomeServerComponent';

export default async function HomePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomeServerComponent />
		</Suspense>
	);
}
