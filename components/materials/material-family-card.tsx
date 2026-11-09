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
      {/* Ambient glow — intensifies on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-brand/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand via-brand-400 to-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand ring-1 ring-brand-100/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white group-hover:ring-brand/30 group-hover:shadow-[0_14px_30px_-14px_rgb(0_51_141/0.65)]">
          <MaterialIcon icon={group.icon} className="h-5 w-5" />
        </span>

        {interactive ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white/80 text-ink-subtle backdrop-blur-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-brand-950 group-hover:shadow-[0_10px_22px_-10px_rgb(255_184_0/0.7)]">
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        ) : null}
      </div>

      <div className="relative mt-5 flex flex-1 flex-col">
        <p className="inline-flex w-fit items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-500">
          <span aria-hidden="true" className="h-px w-4 bg-accent transition-all duration-300 group-hover:w-6" />
          {group.tagline}
        </p>

        <h3 className="mt-2.5 font-display text-[1.55rem] font-semibold leading-tight tracking-tight text-brand-800 transition-colors duration-300 group-hover:text-brand sm:text-[1.65rem]">
          {group.name}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[0.92rem] leading-relaxed text-ink-muted">
          {group.description}
        </p>

        <div className="mt-auto pt-5">
          <div className="border-t border-line/70 pt-4 transition-colors duration-300 group-hover:border-brand-100">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Applications
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label={`${group.name} applications`}>
              {apps.map((app) => (
                <li
                  key={app}
                  className="rounded-full bg-mist/90 px-2.5 py-1 text-[0.7rem] font-medium text-brand-700 ring-1 ring-line/70 transition-all duration-300 group-hover:bg-brand-50 group-hover:text-brand-800 group-hover:ring-brand-100"
                >
                  {app}
                </li>
              ))}
            </ul>
          </div>

          {interactive ? (
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors duration-300 group-hover:text-brand">
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
