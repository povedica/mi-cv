import type { APIRoute } from 'astro';
import { profileMarkdown } from '../../data/profile-markdown';

export const GET: APIRoute = () => new Response(profileMarkdown('en'), {
  headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
});
