import type { Metadata } from "next";
import { MaterialFamilyCard } from "@/components/materials/material-family-card";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { MATERIAL_GROUPS, POLYMER_FAMILIES } from "@/content/materials";
import { platformLinks } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import granulesImage from "@/public/images/polymer-granules.webp";

export const metadata: Metadata = pageMetadata({
  title: "Materials - Polymers, Chemicals & Industrial Raw Materials",
  description:
    "Explore the PolyStoreX materials ecosystem: HDPE, LDPE, LLDPE, PP, PET, PVC, ABS and engineering plastics, plus compounds, masterbatch, elastomers, chemicals, solvents, intermediates, recycled grades, base oils and specialty polymers.",
  path: "/materials",
});

export default function MaterialsPage() {
  const others = MATERIAL_GROUPS.filter((group) => group.slug !== "polymers");

  return (
    <>
      <PageHero
        eyebrow="Materials"
        breadcrumb={{ name: "Materials", path: "/materials" }}
        image={granulesImage}
        imageAlt="Polymer resin granules"
        title="One Grade Master. Ten material families."
        description="Every material traded on PolyStoreX is mapped to a standardised grade - so buyers compare like for like, and sellers list against specifications buyers already trust."
      >
        <TrackedLink
          href={platformLinks.customerMarketplace}
          external
          event="explore_materials_click"
          eventProps={{ location: "materials_hero" }}
          size="lg"
          arrow
        >
          Browse live grades
        </TrackedLink>
        <TrackedLink href="/request-credit" event="request_credit_click" eventProps={{ location: "materials_hero" }} variant="outline-light" size="lg">
          Request Credit
        </TrackedLink>
      </PageHero>

      <section id="polymers" aria-labelledby="polymers-heading" className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Polymers"
            title={<span id="polymers-heading">Commodity and engineering polymers.</span>}
            description="Sixteen polymer families covering film, moulding, extrusion, fibre and engineering applications."
          />
          <ul className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POLYMER_FAMILIES.map((family, index) => (
              <li
                key={family.code}
                data-reveal
                style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as React.CSSProperties}
                className="card-sku group"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="sku-name transition-colors duration-300 group-hover:text-accent">
                    {family.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand-100/80">
                    Polymer
                  </span>
                </div>
                <p className="sku-family">{family.fullName}</p>
                <p className="sku-desc">{family.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-5" aria-label={`${family.name} applications`}>
                  {family.applications.map((app) => (
                    <li
                      key={app}
                      className="rounded-full bg-white/[0.08] px-2.5 py-1 text-xs font-medium text-brand-50 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-white/[0.12]"
                    >
                      {app}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="families-heading" className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow="Beyond polymers"
            title={<span id="families-heading">Chemicals, additives and specialty materials.</span>}
          />
          <ul className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((group, index) => (
              <li
                key={group.slug}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
              >
                <MaterialFamilyCard group={group} anchored />
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-8 shadow-card sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Looking for a specific grade?</h2>
              <p className="mt-2 max-w-2xl text-ink-muted">
                Live listing prices and grades are visible in the PolyStoreX marketplace
                without an account. Sign in to submit purchase requests, download TDS, or
                apply for credit.
              </p>
            </div>
            <TrackedLink
              href={platformLinks.customerMarketplace}
              external
              event="explore_materials_click"
              eventProps={{ location: "materials_footer" }}
              arrow
            >
              Open the marketplace
            </TrackedLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
