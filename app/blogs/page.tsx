import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { CategoryFilter } from "@/components/blog/category-filter";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import {
  getFeaturedPosts,
  getPostCategories,
  getPostsPage,
  POSTS_PAGE_SIZE,
} from "@/sanity/lib/posts";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = pageMetadata({
  title: "Blog - Market Updates & Procurement Guides",
  description:
    "Market updates, material insights, procurement guides and industry news for buyers and sellers of polymers, petrochemicals and industrial materials.",
  path: "/blogs",
});

type BlogsPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams;
  const category = params.category?.trim() || null;
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);

  const [featured, categories, listing] = await Promise.all([
    category ? Promise.resolve([]) : getFeaturedPosts(),
    getPostCategories(),
    getPostsPage({ page, category }),
  ]);

  const totalPages = Math.max(1, Math.ceil(listing.total / POSTS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const featuredIds = new Set(featured.map((post) => post._id));
  const gridPosts =
    !category && safePage === 1 ? listing.posts.filter((post) => !featuredIds.has(post._id)) : listing.posts;
  const showListing = gridPosts.length > 0;
  const configured = isSanityConfigured();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        breadcrumb={{ name: "Blog", path: "/blogs" }}
        title="Industry insights that help you decide better."
        description="Practical, material-specific perspective for the people who buy, sell and finance industrial materials."
      />
      <section className="section bg-white">
        <div className="container space-y-12">
          {categories.length > 0 ? (
            <CategoryFilter categories={categories} activeCategory={category} />
          ) : null}

          {!showListing && !featured.length ? (
            <BlogEmptyState
              description={
                configured
                  ? "We're preparing our first articles. Tell us what you'd like us to cover."
                  : "Our editorial team is setting up the blog. Check back soon — or tell us what you'd like us to cover."
              }
            />
          ) : null}

          {featured.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-brand-800">Featured</h2>
              <ul className="grid gap-6 lg:grid-cols-3">
                {featured.map((post, index) => (
                  <li key={post._id} className={index === 0 ? "lg:col-span-2" : undefined}>
                    <BlogCard post={post} featured={index === 0} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {showListing ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-brand-800">
                {category ? category : "Latest articles"}
              </h2>
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <li key={post._id}>
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>
              <BlogPagination page={safePage} totalPages={totalPages} category={category} />
            </div>
          ) : null}

          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-white">Have a topic you want covered?</h2>
              <p className="mt-2 text-brand-100/80">Share it with our team — we prioritise what buyers and sellers ask for.</p>
            </div>
            <ButtonLink href="/contact?topic=OTHER" variant="light" arrow>
              Suggest a topic
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
