import { getSanityClient } from "@/sanity/lib/client";
import {
  categoriesQuery,
  featuredPostsQuery,
  latestPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  POSTS_PAGE_SIZE,
  postsByCategoryCountQuery,
  postsByCategoryQuery,
  postsCountQuery,
  postsListQuery,
  relatedPostsQuery,
} from "@/sanity/lib/queries";
import type { BlogPost, BlogPostSummary, PostSlugEntry } from "@/sanity/lib/types";

export async function getPostsPage(options: {
  page?: number;
  category?: string | null;
}): Promise<{ posts: BlogPostSummary[]; total: number; pageSize: number }> {
  const page = Math.max(1, options.page ?? 1);
  const start = (page - 1) * POSTS_PAGE_SIZE;
  const end = start + POSTS_PAGE_SIZE;
  const category = options.category?.trim() || null;

  const client = getSanityClient();
  if (!client) {
    return { posts: [], total: 0, pageSize: POSTS_PAGE_SIZE };
  }

  try {
    if (category) {
      const [posts, total] = await Promise.all([
        client.fetch<BlogPostSummary[]>(postsByCategoryQuery, { category, start, end }),
        client.fetch<number>(postsByCategoryCountQuery, { category }),
      ]);
      return { posts: posts ?? [], total: total ?? 0, pageSize: POSTS_PAGE_SIZE };
    }
    const [posts, total] = await Promise.all([
      client.fetch<BlogPostSummary[]>(postsListQuery, { start, end }),
      client.fetch<number>(postsCountQuery),
    ]);
    return { posts: posts ?? [], total: total ?? 0, pageSize: POSTS_PAGE_SIZE };
  } catch {
    return { posts: [], total: 0, pageSize: POSTS_PAGE_SIZE };
  }
}

export async function getFeaturedPosts(): Promise<BlogPostSummary[]> {
  const client = getSanityClient();
  if (!client) return [];
  try {
    return (await client.fetch<BlogPostSummary[]>(featuredPostsQuery)) ?? [];
  } catch {
    return [];
  }
}

export async function getLatestPosts(limit = 4): Promise<BlogPostSummary[]> {
  const client = getSanityClient();
  if (!client) return [];
  try {
    return (await client.fetch<BlogPostSummary[]>(latestPostsQuery, { limit })) ?? [];
  } catch {
    return [];
  }
}

export async function getPostCategories(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) return [];
  try {
    return (await client.fetch<string[]>(categoriesQuery)) ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return (await client.fetch<BlogPost | null>(postBySlugQuery, { slug })) ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(slug: string, category: string | undefined): Promise<BlogPostSummary[]> {
  if (!category) return [];
  const client = getSanityClient();
  if (!client) return [];
  try {
    return (await client.fetch<BlogPostSummary[]>(relatedPostsQuery, { slug, category })) ?? [];
  } catch {
    return [];
  }
}

export async function getAllPostSlugs(): Promise<PostSlugEntry[]> {
  const client = getSanityClient();
  if (!client) return [];
  try {
    return (await client.fetch<PostSlugEntry[]>(postSlugsQuery)) ?? [];
  } catch {
    return [];
  }
}

export { POSTS_PAGE_SIZE };
