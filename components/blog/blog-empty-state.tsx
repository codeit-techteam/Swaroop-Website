import { Newspaper } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { isSanityConfigured } from "@/sanity/env";

type BlogEmptyStateProps = {
  compact?: boolean;
  title?: string;
  description?: string;
};

export function BlogEmptyState({
  compact = false,
  title = "Blog posts coming soon",
  description = "Practical perspective on polymers, petrochemicals and industrial procurement — curated for buyers and sellers.",
}: BlogEmptyStateProps) {
  const configured = isSanityConfigured();

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-dashed border-line bg-paper px-6 py-10 text-center"
          : "mx-auto max-w-xl rounded-2xl border border-dashed border-line bg-paper px-8 py-14 text-center"
      }
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Newspaper aria-hidden className="h-7 w-7" />
      </span>
      <p className="mt-6 font-display text-xl font-semibold text-brand-800">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">{description}</p>
      {!configured ? (
        <p className="mx-auto mt-4 max-w-md text-xs text-ink-subtle">
          CMS connection pending — set <code className="text-brand">NEXT_PUBLIC_SANITY_PROJECT_ID</code> when the
          Sanity project is ready.
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/contact?topic=OTHER" variant="primary" arrow>
          Suggest a topic
        </ButtonLink>
      </div>
    </div>
  );
}
