import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string | null;
  basePath?: string;
};

export function CategoryFilter({ categories, activeCategory, basePath = "/blogs" }: CategoryFilterProps) {
  if (!categories.length) return null;

  const linkClass = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "border-brand bg-brand text-white"
        : "border-line bg-white text-ink-muted hover:border-brand-200 hover:text-brand",
    );

  return (
    <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
      <Link href={basePath} className={linkClass(!activeCategory)}>
        All
      </Link>
      {categories.map((category) => {
        const active = activeCategory === category;
        const href = `${basePath}?category=${encodeURIComponent(category)}`;
        return (
          <Link key={category} href={href} className={linkClass(active)} aria-current={active ? "page" : undefined}>
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
