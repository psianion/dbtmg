import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
});

export async function fetchEntries(contentType) {
  const { items } = await client.getEntries({
    content_type: contentType,
    order: ['-sys.createdAt'] as const
  });
  return items;
}

export async function fetchEntryBySlug(contentType, slug) {
  const { items } = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1
  });
  return items[0] || null;
}
