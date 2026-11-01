import type { APIRoute } from 'astro';
import { getCommitments } from '../lib/commitments';
import { SITE, absolute } from '../lib/site';

// Machine-readable copy of the commitments, for job boards and tools that store the permanent IDs.
export const GET: APIRoute = async () => {
  const commitments = await getCommitments();
  const body = {
    name: SITE.name,
    version: SITE.version,
    license: 'CC-BY-4.0',
    url: SITE.url,
    commitments: commitments.map(({ data }) => ({
      number: data.number,
      topic: data.topic,
      url: absolute(`/${data.slug}/`),
      employer: data.employer,
      candidate: data.candidate,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
