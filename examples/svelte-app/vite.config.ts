import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { monicon } from '@monicon/vite';

export default defineConfig({
	plugins: [sveltekit(), monicon()]
});
