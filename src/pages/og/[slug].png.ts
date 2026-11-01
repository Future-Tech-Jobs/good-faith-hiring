import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { getCommitments } from '../../lib/commitments';
import { shareImage } from '../../lib/render-png';

export const getStaticPaths: GetStaticPaths = async () => {
  const commitments = await getCommitments();
  const pages = await getCollection('pages');
  return [
    { params: { slug: 'index' }, props: { title: 'Hiring works when both sides keep their word.', kicker: 'A fair hiring standard for employers and candidates' } },
    ...commitments.map((c) => ({
      params: { slug: c.data.slug },
      props: { title: `${c.data.employer.title}. ${c.data.candidate.title}.`, kicker: `Commitment ${c.data.number}: ${c.data.topic}` },
    })),
    ...pages.map((p) => ({ params: { slug: p.id }, props: { title: p.data.lede ?? p.data.heading, kicker: p.data.heading } })),
    { params: { slug: 'changes' }, props: { title: 'Every change to the commitments, newest first.', kicker: 'Changes' } },
    { params: { slug: 'adopters' }, props: { title: 'Employers who follow the commitments.', kicker: 'Adopters' } },
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await shareImage(props.title as string, props.kicker as string);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
