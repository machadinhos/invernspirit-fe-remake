import { defineConfig, type Plugin } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

function stripUseClientPlugin(): Plugin {
  return {
    name: 'strip-use-client-web-haptics',
    enforce: 'pre',
    transform(code: string, id: string): string | null {
      if (id.includes('/node_modules/web-haptics/') || id.includes('\\node_modules\\web-haptics\\')) {
        return code.replace(/(^|\n)\s*(['"])use client\2;?/g, '$1');
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), devtoolsJson(), stripUseClientPlugin()],

  server: {
    open: '/pt',
    allowedHosts: ['.invernspirit.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
      '/stock': {
        target: 'http://localhost:8788',
        rewrite: (path): string => path.replace(/^\/stock/, '/private/stock'),
        changeOrigin: true,
      },
    },
  },
});
