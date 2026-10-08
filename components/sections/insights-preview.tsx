import Link from "next/link";
import { ArrowUpRight, BookOpen, Newspaper, ScanSearch, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { INSIGHT_CATEGORIES, PUBLISHED_ARTICLES, type InsightCategory } from "@/content/insights";
import { formatDate } from "@/lib/utils";

const ICONS: Record<InsightCategory["slug"], LucideIcon> = {
  "market-updates": TrendingUp,
  "material-insights": ScanSearch,
  "procurement-guides": BookOpen,
  "industry-news": Newspaper,
};

export function InsightsPreview() {
  return (
    <section aria-labelledby="insights-heading" className="section bg-white">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Insights"
            title={<span id="insights-heading">Industry insights that help you decide better.</span>}
          />
          <Link href="/insights" className="inline-flex items-center gap-2 font-semibold text-accent-600 hover:text-accent-700">
            All insights <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INSIGHT_CATEGORIES.map((category, index) => {
            const Icon = ICONS[category.slug];
            const latest = PUBLISHED_ARTICLES.find((article) => article.category === category.slug);
            return (
              <li
                key={category.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <Link
                  href={`/insights#${category.slug}`}
                  className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                  <h3 className="mt-6 text-xl font-semibold">{category.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{category.description}</p>
                  <p className="mt-auto pt-6 text-sm font-medium text-ink-subtle">
                    {latest ? `Latest · ${formatDate(latest.publishedAt)}` : "First editions coming soon"}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
