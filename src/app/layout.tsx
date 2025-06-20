import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '@/app/globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
	colorScheme: 'light dark',
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
			<head>
				<meta content="light dark" name="color-scheme" />
			</head>
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
