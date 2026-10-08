import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/page-hero";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({
  title,
  path,
  breadcrumb,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  breadcrumb: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" breadcrumb={{ name: breadcrumb, path }} title={title} description={`Last updated ${updated}`} />
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2.5 border-l border-line pl-5 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-ink-muted hover:text-brand-800">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <article className="max-w-3xl">
            <div className="text-lg leading-relaxed text-ink-muted">{intro}</div>
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28 border-t border-line pt-10 mt-10">
                <h2 id={`${section.id}-title`} className="text-2xl font-semibold">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-ink-muted [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
                  {section.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
