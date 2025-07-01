import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		domains: ['localhost', 'images.ctfassets.net'],
	},
	redirects: async () => [
		{
			destination: '/projects/:slug',
			permanent: true,
			source: '/project/:slug',
		},
	],
};

export default nextConfig;
