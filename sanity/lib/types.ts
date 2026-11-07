import type { PortableTextBlock } from "@portabletext/types";

export type SanityImageAsset = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImageAsset;
  excerpt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
};

export type BlogPost = BlogPostSummary & {
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

export type PostSlugEntry = {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
};
