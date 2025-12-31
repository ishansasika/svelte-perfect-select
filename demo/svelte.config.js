import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			'$lib': './src/lib',
			'$components': './src/lib/components',
			'$data': './src/lib/data',
			'$utils': './src/lib/utils',
			'$stores': './src/lib/stores',
			'@select': '../src/lib'
		},
		prerender: {
			entries: [
				'*',
				'/playground/select'
			]
		}
	}
};

export default config;
