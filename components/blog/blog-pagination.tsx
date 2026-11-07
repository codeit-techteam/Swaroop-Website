import Link from "next/link";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  category?: string | null;
};

function pageHref(page: number, category?: string | null): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/blogs?${q}` : "/blogs";
}

export function BlogPagination({ page, totalPages, category }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-4 pt-4">
      {prev ? (
        <Link
          href={pageHref(prev, category)}
          className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-brand hover:border-brand"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink-subtle opacity-50">
          Previous
        </span>
      )}
      <span className="text-sm text-ink-muted">
        Page <span className="font-semibold text-brand-800">{page}</span> of {totalPages}
      </span>
      {next ? (
        <Link
          href={pageHref(next, category)}
          className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-brand hover:border-brand"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink-subtle opacity-50">
          Next
        </span>
      )}
    </nav>
  );
}
