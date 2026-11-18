import { defineConfig } from 'astro/config';
import { astroTracing } from './src/server/astro-tracing.mjs';

export default defineConfig({
  output: 'static',
  integrations: [astroTracing()],
});
