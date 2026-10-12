import type { Metadata } from "next";
import { MaterialIcon } from "@/components/sections/material-icon";
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
    "Explore the Petrotrade materials ecosystem: HDPE, LDPE, LLDPE, PP, PET, PVC, ABS and engineering plastics, plus compounds, masterbatch, elastomers, chemicals, solvents, intermediates, recycled grades, base oils and specialty polymers.",
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
        description="Every material traded on Petrotrade is mapped to a standardised grade - so buyers compare like for like, and sellers list against specifications buyers already trust."
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
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POLYMER_FAMILIES.map((family, index) => (
              <li
                key={family.code}
                data-reveal
                style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as React.CSSProperties}
                className="card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold">{family.name}</h3>
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-subtle">Polymer</span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent-600">{family.fullName}</p>
                <p className="mt-3 text-[0.95rem] text-ink-muted">{family.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${family.name} applications`}>
                  {family.applications.map((app) => (
                    <li key={app} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-brand-700">
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
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {others.map((group, index) => (
              <li
                key={group.slug}
                id={group.slug}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
                className="card flex scroll-mt-28 flex-col p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                  <MaterialIcon icon={group.icon} className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{group.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent-600">{group.tagline}</p>
                <p className="mt-3 leading-relaxed text-ink-muted">{group.description}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-subtle">Typical applications</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {group.applications.map((app) => (
                    <li key={app} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-brand-700">
                      {app}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Looking for a specific grade?</h2>
              <p className="mt-2 max-w-2xl text-ink-muted">
                Live grades, manufacturers and offers are available to verified buyers inside the
                Petrotrade customer platform.
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
