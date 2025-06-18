import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from './components/Providers';
import './globals.css';

export const metadata: Metadata = {
	description:
		'The portfolio of Kevin Beronilla, a designer, developer, photographer, and video editor.',
	title: 'Kevin Beronilla',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
