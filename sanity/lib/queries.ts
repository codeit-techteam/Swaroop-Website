/** Shared GROQ fragments for blog posts (published only). */

export const postListFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  author,
  category,
  tags,
  publishedAt,
  updatedAt,
  featured
`;

export const postDetailFields = /* groq */ `
  ${postListFields},
  body,
  seoTitle,
  seoDescription,
  status
`;

export const POSTS_PAGE_SIZE = 12;

export const postsListQuery = /* groq */ `
  *[_type == "post" && status == "published"]
  | order(publishedAt desc)
  [$start...$end] {
    ${postListFields}
  }
`;

export const postsCountQuery = /* groq */ `
  count(*[_type == "post" && status == "published"])
`;

export const postsByCategoryQuery = /* groq */ `
  *[_type == "post" && status == "published" && category == $category]
  | order(publishedAt desc)
  [$start...$end] {
    ${postListFields}
  }
`;

export const postsByCategoryCountQuery = /* groq */ `
  count(*[_type == "post" && status == "published" && category == $category])
`;

export const featuredPostsQuery = /* groq */ `
  *[_type == "post" && status == "published" && featured == true]
  | order(publishedAt desc)[0...3] {
    ${postListFields}
  }
`;

export const latestPostsQuery = /* groq */ `
  *[_type == "post" && status == "published"]
  | order(publishedAt desc)[0...$limit] {
    ${postListFields}
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && status == "published" && slug.current == $slug][0] {
    ${postDetailFields}
  }
`;

export const relatedPostsQuery = /* groq */ `
  *[_type == "post" && status == "published" && slug.current != $slug && category == $category]
  | order(publishedAt desc)[0...3] {
    ${postListFields}
  }
`;

export const postSlugsQuery = /* groq */ `
  *[_type == "post" && status == "published" && defined(slug.current)]{
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
`;

export const categoriesQuery = /* groq */ `
  array::unique(*[_type == "post" && status == "published" && defined(category)].category) | order(@ asc)
`;
