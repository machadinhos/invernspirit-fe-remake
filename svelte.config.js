import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({ fallback: '404.html' }),

    alias: {
      $components: 'src/lib/components/ui/',
      $content: 'src/lib/content/',
      $state: 'src/lib/state/',
    },
  },
};

export default config;
