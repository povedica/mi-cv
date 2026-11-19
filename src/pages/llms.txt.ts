import type { APIRoute } from 'astro';
import { cv, profileCopy, profileOrigin } from '../data/public-profile';

export const GET: APIRoute = () => new Response(`# ${profileCopy.es.name}

> ${profileCopy.es.headline}. ${profileCopy.es.contact.note}

## Perfil profesional / Professional profile

- [Perfil en español](${profileOrigin}/index.md)
- [Profile in English](${profileOrigin}/en/index.md)

## Curriculum vitae

- [CV en español (PDF)](${profileOrigin}${cv.es})
- [CV in English (PDF)](${profileOrigin}${cv.en})
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
