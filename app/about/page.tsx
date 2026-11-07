import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRightLeft,
  BadgeCheck,
  Eye,
  Factory,
  Handshake,
  LayoutDashboard,
  Scale,
  ShieldCheck,
  Smartphone,
  Store,
  Layers,
} from "lucide-react";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata } from "@/lib/seo";
import { platformLinks } from "@/lib/env";
import manufacturingImage from "@/public/images/industry-manufacturing.webp";
import refineryImage from "@/public/images/hero-refinery-granules.webp";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "PolyStoreX is building India's connected platform for industrial materials - bringing verified supply, structured procurement, logistics and business credit together for buyers and sellers.",
  path: "/about",
});

const WHO_WE_ARE = [
  {
    icon: ShieldCheck,
    title: "Trust by design",
    detail:
      "Verification, standard grades and recorded order history are built into the platform, not bolted on.",
  },
  {
    icon: Eye,
    title: "Transparency",
    detail:
      "Every order moves through visible stages, so buyers and sellers always know where things stand.",
  },
  {
    icon: Scale,
    title: "Fairness",
    detail:
      "Confidential purchase requests and a neutral process keep the marketplace balanced for both sides.",
  },
  {
    icon: Handshake,
    title: "Long-term partnership",
    detail: "We succeed when our customers and suppliers grow - order after order.",
  },
];

const WHAT_WE_DO = [
  {
    title: "Source",
    detail: "Browse standardised grades and live offers across polymers, chemicals and industrial materials.",
  },
  {
    title: "Trade",
    detail: "Raise purchase requests, negotiate commercially and confirm orders on one structured workflow.",
  },
  {
    title: "Deliver",
    detail: "Coordinate dispatch, logistics and settlement with clear status at every step.",
  },
  {
    title: "Finance",
    detail: "Eligible buyers can apply for managed business credit reviewed by the PolyStoreX credit team.",
  },
];

const MARKETPLACE_MODEL = [
  {
    icon: Layers,
    title: "Blind marketplace",
    detail:
      "Buyers evaluate material grade, specification and commercial terms - not private seller identities.",
  },
  {
    icon: BadgeCheck,
    title: "Verified participants",
    detail:
      "Businesses are verified before they trade, so both sides operate inside a controlled ecosystem.",
  },
  {
    icon: ArrowRightLeft,
    title: "Structured fulfilment",
    detail:
      "From request to payment and delivery, every stage is recorded and visible to the parties involved.",
  },
];

const ECOSYSTEM = [
  {
    icon: Store,
    title: "Customer platform",
    detail:
      "Web and mobile apps for buyers to browse grades, request materials, pay, track orders and apply for credit.",
  },
  {
    icon: Factory,
    title: "Seller platform",
    detail:
      "Inventory, offers, purchase-request responses, dispatch and settlements for verified suppliers.",
  },
  {
    icon: LayoutDashboard,
    title: "Operations & credit desk",
    detail:
      "PolyStoreX's internal teams manage verification, procurement, logistics and credit review.",
  },
  {
    icon: Smartphone,
    title: "One backend, every channel",
    detail:
      "Website, web apps and mobile app share the same secure PolyStoreX platform and data.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        breadcrumb={{ name: "About", path: "/about" }}
        image={refineryImage}
        imageAlt="Petrochemical plant behind a pile of polymer granules"
        title="Industrial materials. Sourced smarter."
        description="PolyStoreX brings verified supply, structured procurement, logistics and business credit onto one technology-driven B2B platform."
      />

      <section aria-labelledby="who-heading" className="section bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={<span id="who-heading">A connected platform for industrial materials.</span>}
              description="PolyStoreX is operated by Veylron Polychem Private Limited. We connect manufacturers, traders, contractors and suppliers of polymers, petrochemicals and industrial materials."
            />
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              Industrial procurement still runs on phone calls, scattered price lists and paperwork.
              We bring it onto one transparent platform - so businesses can source, trade and finance
              materials with confidence.
            </p>
          </div>
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={manufacturingImage}
              alt="Injection moulding machine processing polymer granules"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="what-heading" className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow="What PolyStoreX does"
            title={<span id="what-heading">Source. Trade. Deliver. Finance.</span>}
            description="Four connected capabilities that keep procurement moving from discovery to delivery."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_DO.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                className="card-surface"
              >
                <span className="font-display text-4xl font-semibold text-brand-100">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-brand-800">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="model-heading" className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Our marketplace model"
            title={<span id="model-heading">Grade-first. Identity-protected.</span>}
            description="Buyers compare materials on specification and commercial terms. Seller identities stay protected under PolyStoreX's blind marketplace model."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {MARKETPLACE_MODEL.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="card p-7 hover:border-brand-200 hover:shadow-lift"
              >
                <item.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="grades-heading" className="section bg-brand-950 text-white">
        <div className="container relative">
          <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-40" />
          <div className="relative max-w-3xl">
            <SectionHeading
              eyebrow="Material & grade standardisation"
              tone="light"
              title={<span id="grades-heading">One Grade Master. Comparable materials.</span>}
              description="Every material traded on PolyStoreX maps to a standardised grade - so buyers compare like for like, and sellers list against specifications buyers already trust."
            />
            <div className="mt-10">
              <TrackedLink
                href="/materials"
                event="explore_materials_click"
                eventProps={{ location: "about_grades" }}
                size="lg"
                arrow
              >
                Explore materials
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="howto-heading" className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="How buyers and sellers work with us"
            title={<span id="howto-heading">One platform, built for every participant.</span>}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {ECOSYSTEM.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 80}ms` } as React.CSSProperties}
                className="card flex gap-5 p-7 hover:border-brand-200 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <item.icon aria-hidden="true" className="h-[22px] w-[22px]" />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold text-brand-800">
                    {item.title}
                  </span>
                  <span className="mt-2 block leading-relaxed text-ink-muted">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow="Trust, transparency & reliability"
            title={<span id="trust-heading">Principles that shape the platform.</span>}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_WE_ARE.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="card-surface"
              >
                <item.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-5 text-xl font-semibold text-brand-800">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
          <div
            data-reveal
            className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-900 p-8 text-white sm:flex-row sm:items-center sm:p-10"
          >
            <div>
              <h2 className="text-2xl font-semibold text-white">Ready to source smarter?</h2>
              <p className="mt-2 max-w-xl text-brand-100/75">
                Explore live grades in the marketplace, or talk to the PolyStoreX team about credit
                and partnerships.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href={platformLinks.customerMarketplace}
                external
                event="explore_materials_click"
                eventProps={{ location: "about_cta" }}
                variant="light"
                arrow
              >
                Open marketplace
              </TrackedLink>
              <TrackedLink
                href="/contact"
                event="platform_cta_click"
                eventProps={{ location: "about_cta", target: "contact" }}
                variant="outline-light"
              >
                Contact us
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
