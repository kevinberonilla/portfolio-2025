import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		domains: ['localhost', 'images.ctfassets.net'],
	},
};

export default nextConfig;
