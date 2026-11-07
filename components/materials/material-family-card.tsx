import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaterialIcon } from "@/components/sections/material-icon";
import type { MaterialGroup } from "@/content/materials";
import { cn } from "@/lib/utils";

type MaterialFamilyCardProps = {
  group: MaterialGroup;
  href?: string;
  className?: string;
  /** When true, the card is an in-page anchor target (materials page). */
  anchored?: boolean;
};

/**
 * Industrial catalogue card for a material family — shared by home + /materials.
 */
export function MaterialFamilyCard({
  group,
  href = `/materials#${group.slug}`,
  className,
  anchored = false,
}: MaterialFamilyCardProps) {
  const apps = group.applications.slice(0, 4);
  const interactive = !anchored;

  const body = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-accent-500 to-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand ring-1 ring-brand-100 transition-all duration-300 group-hover:from-brand group-hover:to-brand-700 group-hover:text-white group-hover:ring-brand/20 group-hover:shadow-[0_12px_28px_-12px_rgb(0_51_141/0.55)]">
          <MaterialIcon icon={group.icon} className="h-6 w-6" />
        </span>
        {interactive ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-subtle transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-brand-950 group-hover:shadow-sm">
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-600">
          {group.tagline}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-brand-800 transition-colors group-hover:text-brand">
          {group.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-muted">
          {group.description}
        </p>

        <div className="mt-auto pt-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
            Applications
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label={`${group.name} applications`}>
            {apps.map((app) => (
              <li
                key={app}
                className="rounded-lg bg-paper px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-line transition-colors group-hover:bg-brand-50 group-hover:ring-brand-100"
              >
                {app}
              </li>
            ))}
          </ul>

          {interactive ? (
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 transition-colors group-hover:text-accent-600">
              Explore {group.name.toLowerCase()}
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  const shellClass = cn("card-material group relative", className);

  if (anchored) {
    return (
      <article id={group.slug} className={cn(shellClass, "scroll-mt-28")}>
        {body}
      </article>
    );
  }

  return (
    <Link href={href} className={shellClass}>
      {body}
    </Link>
  );
}
