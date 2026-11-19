import type { APIRoute } from 'astro';
import { cv, cvModified, profileModified, profileOrigin, profilePaths } from '../data/public-profile';

function entries(paths: typeof cv, lastmod: string) {
  const alternates = [
    ['es', paths.es], ['en', paths.en], ['x-default', paths.es],
  ].map(([lang, path]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${profileOrigin}${path}"/>`).join('\n');

  return Object.values(paths).map(path => `  <url>
    <loc>${profileOrigin}${path}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`).join('\n');
}

export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries(profilePaths, profileModified)}
${entries(cv, cvModified)}
</urlset>
`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
