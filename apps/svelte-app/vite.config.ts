import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { monicon } from '@monicon/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		monicon({
			icons: [
				'mdi:home',
				'mdi:account',
				'mdi:account-badge-outline',
				'feather:activity',
				'feather:alert-circle',
				'logos:active-campaign',
				'logos:apache-superset-icon'
			],
			outputFileName: 'svelte-app'
		})
	]
});
