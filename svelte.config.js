import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		// adapter: adapter({
		// 	pages: 'build',
		// 	assets: 'build'
		// }),
		paths: {
			base: '/lightweight-charts-svelte'
		},
		alias: {
			$lib: 'src/lib'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
