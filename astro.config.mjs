import { defineConfig } from 'astro/config';
import { astroTracing } from './src/server/astro-tracing.mjs';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [astroTracing()],
});
