import type { SEOConfig } from '$lib/types';

export function generateSEO(config: SEOConfig) {
	return {
		title: config.title,
		description: config.description,
		openGraph: {
			title: config.title,
			description: config.description,
			url: config.url,
			type: config.type || 'website',
			image: config.image || '/og-image.png'
		},
		twitter: {
			card: 'summary_large_image',
			title: config.title,
			description: config.description,
			image: config.image || '/og-image.png'
		},
		keywords: config.keywords?.join(', ')
	};
}
