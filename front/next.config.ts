import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: {
		appIsrStatus: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
		]
	},
};

module.exports = {
	output: 'export',
};

export default nextConfig;
