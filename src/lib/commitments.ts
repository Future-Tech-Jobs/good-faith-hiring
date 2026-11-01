import { getCollection, type CollectionEntry } from 'astro:content';

export type Commitment = CollectionEntry<'commitments'>;

export async function getCommitments(): Promise<Commitment[]> {
  const all = await getCollection('commitments');
  return all.sort((a, b) => a.data.number - b.data.number);
}
