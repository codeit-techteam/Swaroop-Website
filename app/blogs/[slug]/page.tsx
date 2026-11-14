import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPortableText } from "@/components/blog/portable-text";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { imageUrl } from "@/sanity/lib/image";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/sanity/lib/posts";
import { isSanityConfigured } from "@/sanity/env";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  const entries = await getAllPostSlugs();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return pageMetadata({
      title: "Article not found",
      description: "This blog post could not be found.",
      path: `/blogs/${slug}`,
      noIndex: true,
    });
  }

  const title = post.seoTitle?.trim() || post.title;
  const description = post.seoDescription?.trim() || post.excerpt || "";
  const ogImage = imageUrl(post.mainImage, { width: 1200, height: 630 });

  return pageMetadata({
    title,
    description,
    path: `/blogs/${slug}`,
    image: ogImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!isSanityConfigured()) {
    notFound();
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(slug, post.category);
  const heroImage = imageUrl(post.mainImage, { width: 1400, height: 720 });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: heroImage ? [heroImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    mainEntityOfPage: absoluteUrl(`/blogs/${slug}`),
    publisher: {
      "@type": "Organization",
      name: "PolyStoreX",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/polystorex-logo-light-bg.png"),
      },
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article className="bg-white">
        <div className="border-b border-line bg-paper py-8">
          <div className="container">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All posts
            </Link>
          </div>
        </div>

        <header className="section pb-0 pt-12 sm:pt-16">
          <div className="container max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink-subtle">
              {post.category ? (
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand">
                  {post.category}
                </span>
              ) : null}
              {post.publishedAt ? <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> : null}
              {post.author ? <span>· {post.author}</span> : null}
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-brand-800 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? <p className="lede mt-6">{post.excerpt}</p> : null}
          </div>
        </header>

        {heroImage ? (
          <div className="container mt-10 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line shadow-card">
              <Image
                src={heroImage}
                alt={post.mainImage?.alt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>
        ) : null}

        <div className="section">
          <div className="container max-w-3xl">
            <BlogPortableText value={post.body} />

            {post.tags && post.tags.length > 0 ? (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {related.length > 0 ? (
          <section className="section border-t border-line bg-paper" aria-labelledby="related-posts-heading">
            <div className="container">
              <h2 id="related-posts-heading" className="text-2xl font-semibold text-brand-800">
                Related articles
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item._id}>
                    <BlogCard post={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
