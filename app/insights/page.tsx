import type { Metadata } from "next";
import { BookOpen, Newspaper, ScanSearch, TrendingUp, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { INSIGHT_CATEGORIES, PUBLISHED_ARTICLES, type InsightCategory } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Insights - Market Updates & Procurement Guides",
  description:
    "Market updates, material insights, procurement guides and industry news for buyers and sellers of polymers, petrochemicals and industrial materials.",
  path: "/insights",
});

const ICONS: Record<InsightCategory["slug"], LucideIcon> = {
  "market-updates": TrendingUp,
  "material-insights": ScanSearch,
  "procurement-guides": BookOpen,
  "industry-news": Newspaper,
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        breadcrumb={{ name: "Insights", path: "/insights" }}
        title="Industry insights that help you decide better."
        description="Practical, material-specific perspective for the people who buy, sell and finance industrial materials."
      />
      <section className="section bg-white">
        <div className="container space-y-16">
          {INSIGHT_CATEGORIES.map((category) => {
            const Icon = ICONS[category.slug];
            const articles = PUBLISHED_ARTICLES.filter((article) => article.category === category.slug);
            return (
              <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-heading`} className="scroll-mt-28">
                <div className="flex items-center gap-4 border-b border-line pb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <Icon aria-hidden="true" className="h-[22px] w-[22px]" />
                  </span>
                  <div>
                    <h2 id={`${category.slug}-heading`} className="text-2xl font-semibold sm:text-3xl">
                      {category.title}
                    </h2>
                    <p className="mt-1 text-ink-muted">{category.description}</p>
                  </div>
                </div>
                {articles.length ? (
                  <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                      <li key={article.slug} className="card p-7">
                        <p className="text-sm text-ink-subtle">{formatDate(article.publishedAt)}</p>
                        <h3 className="mt-3 text-xl font-semibold">{article.title}</h3>
                        <p className="mt-3 text-ink-muted">{article.excerpt}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-8 rounded-2xl border border-dashed border-line bg-paper px-6 py-10 text-center">
                    <p className="font-display text-lg font-semibold text-brand-800">First editions coming soon</p>
                    <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
                      We're preparing our first {category.title.toLowerCase()}. Tell us what you'd like
                      us to cover.
                    </p>
                  </div>
                )}
              </section>
            );
          })}
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-white">Have a topic you want covered?</h2>
              <p className="mt-2 text-brand-100/80">Share it with our team - we prioritise what buyers and sellers ask for.</p>
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
