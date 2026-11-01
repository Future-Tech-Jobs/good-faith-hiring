import type { APIRoute } from 'astro';
import { iconPng } from '../lib/render-png';

export const GET: APIRoute = () => new Response(new Uint8Array(iconPng(32)), { headers: { 'Content-Type': 'image/png' } });
