import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '@/app/globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
	description:
		'The portfolio of Kevin Beronilla, a designer, developer, photographer, and video editor.',
	title: 'Kevin Beronilla',
};

interface RootLayoutProps {
	children: ReactNode;
	modal: ReactNode;
}

export default function RootLayout({
	children,
	modal,
}: Readonly<RootLayoutProps>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<Providers>{children}</Providers>
				{modal}
			</body>
		</html>
	);
}
