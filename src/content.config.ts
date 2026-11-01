import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const side = (prefix: 'E' | 'C') =>
  z.object({
    id: z.string().regex(new RegExp(`^GFH-${prefix}[1-8]$`)),
    title: z.string(),
    summary: z.string(),
    good: z.string(),
    exact: z.array(z.string()).default([]),
  });

const commitments = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/commitments' }),
  schema: z
    .object({
      number: z.number().int().min(1).max(8),
      slug: z.string(),
      topic: z.string(),
      title: z.string().max(60),
      description: z.string().max(155),
      employer: side('E'),
      candidate: side('C'),
      since: z.string(),
    })
    .refine((c) => c.employer.id === `GFH-E${c.number}` && c.candidate.id === `GFH-C${c.number}`, {
      message: 'IDs must match the commitment number. IDs are permanent: never renumber.',
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string().max(60),
    heading: z.string(),
    description: z.string().max(155),
    lede: z.string().optional(),
    checklist: z.enum(['employer', 'candidate']).optional(),
    updated: z.coerce.date(),
  }),
});

const changes = defineCollection({
  loader: file('./content/changes.yaml'),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

const adopters = defineCollection({
  loader: file('./content/adopters.yaml'),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    listed: z.coerce.date(),
    version: z.string(),
  }),
});

export const collections = { commitments, pages, changes, adopters };
