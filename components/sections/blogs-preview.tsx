import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestPosts } from "@/sanity/lib/posts";

export async function BlogsPreview() {
  const posts = await getLatestPosts(4);

  return (
    <section aria-labelledby="blogs-heading" className="section bg-white">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Blog"
            title={<span id="blogs-heading">Industry insights that help you decide better.</span>}
          />
          <Link href="/blogs" className="inline-flex items-center gap-2 font-semibold text-accent-600 hover:text-accent-700">
            All posts <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => (
              <li
                key={post._id}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12">
            <BlogEmptyState compact />
          </div>
        )}
      </div>
    </section>
  );
}
