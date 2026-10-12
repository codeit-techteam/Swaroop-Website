import type { Metadata } from "next";
import {
  Anchor,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  FileText,
  Handshake,
  PackageSearch,
  Scale,
  Ship,
  Store,
} from "lucide-react";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { IMPORT_FAQ_ITEMS } from "@/content/faq";
import { platformLinks } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Import Trading for Polymers & Petrochemicals",
  description:
    "Import polymers and petrochemicals into India on Petrotrade. Post an import requirement or publish an import offer, get matched on grade, price, Incoterm and ports, negotiate anonymously and track every shipment to delivery.",
  path: "/import",
});

const SIDES = [
  {
    icon: PackageSearch,
    eyebrow: "For buyers",
    title: "Post an import requirement",
    points: [
      "Specify product, grade, preferred brand and country of origin",
      "Set quantity, target price, currency and Incoterm",
      "Choose your port of discharge, payment terms and shipment window",
      "List the documents you need, from COA and TDS to bill of lading",
    ],
    cta: { label: "Post a requirement", href: platformLinks.customerImportBuy, platform: "customer" },
  },
  {
    icon: Store,
    eyebrow: "For sellers",
    title: "Publish an import offer",
    points: [
      "List material by grade, brand and origin with available quantity and MOQ",
      "Quote price per unit in your currency on the Incoterm you trade",
      "Name the port of loading, shipment window and offer validity",
      "Attach quality and shipping documents buyers can review",
    ],
    cta: { label: "Publish an offer", href: platformLinks.sellerImportSell, platform: "seller" },
  },
] as const;

const STEPS = [
  {
    icon: FileText,
    title: "Post",
    detail: "Buyers publish requirements and sellers publish offers. Product, grade, origin, currency, Incoterm and ports are locked once a listing goes live.",
  },
  {
    icon: Scale,
    title: "Match",
    detail: "Each listing is scored against the other side on 14 criteria - product, grade, price, quantity, Incoterm, ports, payment terms, shipment window and more.",
  },
  {
    icon: Handshake,
    title: "Negotiate",
    detail: "Counter on price, quantity, payment terms or shipment window. Both sides see each other only by an anonymous reference.",
  },
  {
    icon: BadgeCheck,
    title: "Confirm",
    detail: "An accepted negotiation becomes a deal, and it's binding only once both the buyer and the seller confirm it.",
  },
  {
    icon: Ship,
    title: "Ship & track",
    detail: "Every shipment is tracked through booked, shipped, in transit, arrived, customs clearance, out for delivery and delivered.",
  },
];

const TERMS = [
  { icon: Anchor, title: "Incoterms", items: ["FOB", "CFR", "CIF", "FCA", "EXW"] },
  { icon: Banknote, title: "Currencies", items: ["USD", "EUR", "CNY", "INR"] },
  {
    icon: CheckCircle2,
    title: "Payment terms",
    items: ["T/T advance & part payment", "LC at sight to 120 days", "D/P", "Open account", "INR credit terms"],
  },
  {
    icon: Ship,
    title: "Origins & ports",
    items: ["China", "Middle East", "South-East Asia", "Korea & Taiwan", "USA & Europe", "Major Indian ports"],
  },
  {
    icon: FileText,
    title: "Documents",
    items: ["COA", "TDS", "SDS / MSDS", "Certificate of origin", "Invoice & packing list", "Bill of lading", "SGS / BV inspection", "Insurance"],
  },
];

export default function ImportPage() {
  return (
    <>
      <PageHero
        eyebrow="Import trading"
        breadcrumb={{ name: "Import", path: "/import" }}
        title="Import polymers and petrochemicals with confidence."
        description="Post what you need or what you can supply. Petrotrade matches international offers with Indian demand, hosts the negotiation and tracks every shipment from the port of loading to delivery."
      >
        <TrackedLink href={platformLinks.customerImportBuy} external event="import_cta_click" eventProps={{ location: "import_hero", platform: "customer" }} size="lg" arrow>
          Post an import requirement
        </TrackedLink>
        <TrackedLink href={platformLinks.sellerImportSell} external event="import_cta_click" eventProps={{ location: "import_hero", platform: "seller" }} variant="outline-light" size="lg">
          Publish an import offer
        </TrackedLink>
      </PageHero>

      <section aria-labelledby="import-sides-heading" className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Two sides, one desk"
            title={<span id="import-sides-heading">Built for importers and the sellers who supply them.</span>}
            description="Buy requirements and sell offers use the same structured terms, so every match compares like with like."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {SIDES.map((side) => (
              <article key={side.title} data-reveal className="flex flex-col rounded-2xl border border-line bg-paper p-8 sm:p-10">
                <side.icon aria-hidden="true" className="h-8 w-8 text-accent" />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">{side.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold">{side.title}</h3>
                <ul className="mt-6 flex-1 space-y-3">
                  {side.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 leading-relaxed text-ink-muted">
                      <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={side.cta.href}
                  external
                  event="import_cta_click"
                  eventProps={{ location: "import_sides", platform: side.cta.platform }}
                  variant="secondary"
                  className="mt-8 self-start"
                  arrow
                >
                  {side.cta.label}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="import-steps-heading" className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow="How import trading works"
            title={<span id="import-steps-heading">From listing to landed cargo, in five steps.</span>}
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <step.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                  <span className="font-display text-sm font-semibold text-ink-subtle">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="import-terms-heading" className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Trade terms"
            title={<span id="import-terms-heading">The terms international trade runs on.</span>}
            description="Every listing is built from standard reference data, so prices, ports and payment terms mean the same thing to both sides."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TERMS.map((group) => (
              <div key={group.title} data-reveal className="rounded-2xl border border-line p-6">
                <div className="flex items-center gap-3">
                  <group.icon aria-hidden="true" className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={IMPORT_FAQ_ITEMS} title="Import trading, explained." />
      <FinalCta />
    </>
  );
}
