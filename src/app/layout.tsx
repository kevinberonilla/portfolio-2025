import '@/app/globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ReactNode } from 'react';
import { Providers } from '@/components/Providers';
import { SITE_TITLE, SITE_URL } from '@/lib/constants';

interface RootLayoutProps {
	children: ReactNode;
	modal: ReactNode;
}

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
	description:
		'The portfolio of Kevin Beronilla, a designer, developer, photographer, and video editor.',
	title: SITE_TITLE,
};

export default function RootLayout({
	children,
	modal,
}: Readonly<RootLayoutProps>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link href="https://fonts.gstatic.com" rel="preconnect" />
			</head>
			<body className="antialiased">
				<Providers>{children}</Providers>
				{modal}
			</body>
			<GoogleAnalytics gaId="G-RNM45PNX22" />
		</html>
	);
}
