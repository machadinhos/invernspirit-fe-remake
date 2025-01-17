import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({ fallback: 'plaintext' }),

    alias: {
      $components: 'src/lib/components/ui/index.ts',
      $constants: 'src/lib/constants/index.ts',
      $content: 'src/lib/content/index.ts',
      $state: 'src/lib/state/index.ts',
      $service: 'src/lib/service/index.ts',
      '$service-server': 'src/lib/server/service/index.ts',
      $types: 'src/lib/types/index.ts',
    },
  },
};

export default config;
