import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            description="Every material on Swaroop maps to a grade in our Grade Master — ten material families, from commodity polymers to specialty chemicals."
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
            className="group mt-14 grid overflow-hidden rounded-3xl bg-brand-900 text-white shadow-lift lg:grid-cols-[1.05fr_1fr]"
          >
            <div className="relative min-h-[260px] lg:min-h-full">
              <Image
                src={granulesImage}
                alt="Close-up of white and blue polymer resin granules"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-900/40" />
            </div>
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <MaterialIcon icon="polymers" className="h-5 w-5 text-accent-200" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-200">
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
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white"
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
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-200"
              >
                Explore polymers <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ) : null}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((group, index) => (
            <li
              key={group.slug}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
            >
              <Link
                href={`/materials#${group.slug}`}
                className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <MaterialIcon icon={group.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-ink-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{group.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent-600">{group.tagline}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{group.description}</p>
                <p className="mt-auto pt-6 text-sm text-ink-subtle">
                  <span className="font-semibold text-brand-800">Applications:</span>{" "}
                  {group.applications.slice(0, 3).join(", ")}
                </p>
                <span className="mt-4 text-sm font-semibold text-brand-800 group-hover:text-accent-600">
                  Explore {group.name.toLowerCase()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
