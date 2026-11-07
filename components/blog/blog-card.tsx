import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/sanity/lib/image";
import type { BlogPostSummary } from "@/sanity/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPostSummary;
  featured?: boolean;
  className?: string;
};

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const href = `/blogs/${post.slug}`;
  const thumb = imageUrl(post.mainImage, { width: featured ? 960 : 640, height: featured ? 540 : 360 });

  return (
    <article className={cn("card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <Link href={href} className="flex h-full flex-col">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-brand-50",
            featured ? "aspect-[16/9]" : "aspect-[16/10]",
          )}
        >
          {thumb ? (
            <Image
              src={thumb}
              alt={post.mainImage?.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-900 to-brand-700">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent-200">PolyStoreX</span>
            </div>
          )}
          {post.featured ? (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-brand-900">
              Featured
            </span>
          ) : null}
        </div>
        <div className={cn("flex flex-1 flex-col", featured ? "p-8" : "p-7")}>
          <div className="flex flex-wrap items-center gap-2 text-sm text-ink-subtle">
            {post.category ? (
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand">{post.category}</span>
            ) : null}
            {post.publishedAt ? <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> : null}
          </div>
          <h3 className={cn("mt-3 font-semibold text-brand-800", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
            {post.title}
          </h3>
          {post.excerpt ? <p className="mt-3 line-clamp-3 text-ink-muted">{post.excerpt}</p> : null}
          {post.author ? <p className="mt-auto pt-5 text-sm font-medium text-ink-subtle">By {post.author}</p> : null}
        </div>
      </Link>
    </article>
  );
}
