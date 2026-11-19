import type { APIRoute } from 'astro';
import { cv, profileCopy, profileOrigin } from '../../data/public-profile';

export const GET: APIRoute = () => new Response(`# ${profileCopy.en.name}

> ${profileCopy.en.headline}. ${profileCopy.en.contact.note}

## Professional profile

- [Profile in English](${profileOrigin}/en/index.md)
- [Profile in Spanish](${profileOrigin}/index.md)
- [Spanish discovery index](${profileOrigin}/llms.txt)

## Curriculum vitae

- [CV in English (PDF)](${profileOrigin}${cv.en})
- [CV in Spanish (PDF)](${profileOrigin}${cv.es})
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
