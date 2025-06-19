'use server';

import { Suspense } from 'react';
import { FiLoader } from 'react-icons/fi';
import HomeServerComponent from '@/components/HomeServerComponent';

export default async function HomePage() {
	return (
		<Suspense
			fallback={
				<div className="flex h-dvh w-dvw items-center justify-center">
					<FiLoader className="text-primary size-12 animate-spin opacity-30 dark:opacity-20" />
				</div>
			}
		>
			<HomeServerComponent />
		</Suspense>
	);
}
