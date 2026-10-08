import Link from "next/link";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQ_ITEMS, type FaqItem } from "@/content/faq";

export function FaqSection({ items = FAQ_ITEMS, title = "Questions, answered." }: { items?: FaqItem[]; title?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section bg-paper">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={<span id="faq-heading">{title}</span>}
            description={
              <>
                Can't find what you need?{" "}
                <Link href="/contact" className="font-semibold text-accent-600 underline-offset-4 hover:underline">
                  Talk to the Swaroop team
                </Link>
                .
              </>
            }
          />
        </div>
        <div data-reveal className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {items.map((item, index) => (
            <details key={item.question} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-display text-lg font-semibold text-brand-800 transition-colors hover:bg-paper sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-brand transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white">
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-ink-muted sm:px-8 sm:pb-7">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
