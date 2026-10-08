/**
 * Insights are CMS-ready: the backend CMS currently only serves authenticated
 * banners, so there is no published article feed yet. Until one exists, the
 * site renders the editorial categories below and an explicit "coming soon"
 * state — it never invents articles, dates or authors.
 */
export type InsightCategory = {
  slug: "market-updates" | "material-insights" | "procurement-guides" | "industry-news";
  title: string;
  description: string;
};

export type InsightArticle = {
  slug: string;
  category: InsightCategory["slug"];
  title: string;
  excerpt: string;
  publishedAt: string;
};

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  {
    slug: "market-updates",
    title: "Market Updates",
    description: "Price direction, supply signals and demand trends across polymers and petrochemicals.",
  },
  {
    slug: "material-insights",
    title: "Material Insights",
    description: "Grade selection, properties and processing notes for the materials you buy.",
  },
  {
    slug: "procurement-guides",
    title: "Procurement Guides",
    description: "Practical playbooks for planning, negotiating and financing industrial purchases.",
  },
  {
    slug: "industry-news",
    title: "Industry News",
    description: "Developments shaping India's manufacturing, packaging and infrastructure sectors.",
  },
];

/** Production article feed. Populate from the CMS when publishing goes live. */
export const PUBLISHED_ARTICLES: InsightArticle[] = [];
