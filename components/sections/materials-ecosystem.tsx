import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaterialFamilyCard } from "@/components/materials/material-family-card";
import { MaterialIcon } from "@/components/sections/material-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { MATERIAL_GROUPS, POLYMER_FAMILIES } from "@/content/materials";
import granulesImage from "@/public/images/polymer-granules.webp";

export function MaterialsEcosystem() {
  const [polymers, ...others] = MATERIAL_GROUPS;

  return (
    <section id="materials" aria-labelledby="materials-heading" className="section bg-paper">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Materials ecosystem"
            title={
              <span id="materials-heading">
                Everything your business needs.{" "}
                <span className="text-ink-subtle">One industrial materials platform.</span>
              </span>
            }
            description="Every material on PolyStoreX maps to a grade in our Grade Master - ten material families, from commodity polymers to specialty chemicals."
          />
          <TrackedLink
            href="/materials"
            event="explore_materials_click"
            eventProps={{ location: "materials_section" }}
            variant="ghost"
            arrow
            className="self-start lg:self-auto"
          >
            View all materials
          </TrackedLink>
        </div>

        {polymers ? (
          <article
            data-reveal
            className="group relative mt-14 grid overflow-hidden rounded-[1.6rem] bg-brand-900 text-white shadow-lift ring-1 ring-white/5 lg:grid-cols-[1.05fr_1fr]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-brand-300 via-accent to-accent/70"
            />
            <div className="relative min-h-[260px] lg:min-h-full">
              <Image
                src={granulesImage}
                alt="Close-up of white and blue polymer resin granules"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-900/40" />
            </div>
            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-accent/20">
                  <MaterialIcon icon="polymers" className="h-5 w-5 text-accent" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {polymers.tagline}
                </p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">{polymers.name}</h3>
              <p className="mt-4 max-w-lg text-brand-100/80">{polymers.description}</p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Polymer families">
                {POLYMER_FAMILIES.slice(0, 12).map((family) => (
                  <li
                    key={family.code}
                    title={family.fullName}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.1]"
                  >
                    {family.name}
                  </li>
                ))}
                <li className="rounded-full px-2 py-1.5 text-sm text-brand-100/70">
                  + {POLYMER_FAMILIES.length - 12} more
                </li>
              </ul>
              <p className="mt-7 text-sm text-brand-100/70">
                <span className="font-semibold text-white">Used for:</span> {polymers.applications.join(" · ")}
              </p>
              <Link
                href="/materials#polymers"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-all duration-300 hover:bg-accent hover:text-brand-950 hover:ring-accent"
              >
                Explore polymers <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ) : null}

        <ul className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((group, index) => (
            <li
              key={group.slug}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
            >
              <MaterialFamilyCard group={group} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
