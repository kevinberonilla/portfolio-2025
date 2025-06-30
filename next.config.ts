import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		domains: ['localhost', 'images.ctfassets.net'],
	},
	redirects: async () => {
		return [
			{
				destination: '/projects/:slug',
				permanent: true,
				source: '/#!/:slug',
			},
		];
	},
};

export default nextConfig;
