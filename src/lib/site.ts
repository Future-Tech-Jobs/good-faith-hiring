export const SITE = {
  name: 'Good Faith Hiring',
  url: 'https://goodfaithhiring.co.uk',
  tagline: 'Eight commitments for employers, and eight for the people applying to them.',
  hello: 'hello@goodfaithhiring.co.uk',
  reports: 'reports@goodfaithhiring.co.uk',
  repo: 'https://github.com/Future-Tech-Jobs/good-faith-hiring',
  discussions: 'https://github.com/Future-Tech-Jobs/good-faith-hiring/discussions',
  version: 'Draft 1',
  versionSlug: 'draft-1',
  published: '2026-11-01',
  company: {
    name: 'Future Tech Jobs Limited',
    brand: 'Future Tech Jobs',
    url: 'https://futuretechjobs.co.uk',
    number: '17508006',
    registeredIn: 'England and Wales',
    office: '16a Herga Court, Harrow, London, HA1 3RS',
  },
} as const;

export const absolute = (path: string) => new URL(path, SITE.url).href;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Appends the site name to a page title when it still fits in 60 characters. */
export const fullTitle = (title: string) => {
  if (title.includes(SITE.name)) return title;
  const withName = `${title} | ${SITE.name}`;
  return withName.length <= 60 ? withName : title;
};
