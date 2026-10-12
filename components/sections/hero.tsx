import Image from "next/image";
import { BadgeCheck, FileCheck2, PackageCheck, ScanSearch, Truck } from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-link";
import heroImage from "@/public/images/hero-refinery-granules.webp";

const FLOW = [
  { icon: ScanSearch, title: "Grade selected", detail: "Matched to the Petrotrade Grade Master" },
  { icon: BadgeCheck, title: "Verified supplier offer", detail: "KYC-verified seller, confidential until confirmation" },
  { icon: FileCheck2, title: "Commercial confirmation", detail: "Price, quantity and terms agreed" },
  { icon: Truck, title: "Dispatch & shipment", detail: "Milestones and documents in one place" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      <Image
        src={heroImage}
        alt="Polymer granules in front of a petrochemical processing plant at dusk"
        priority
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-[70%_center] opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(2_11_24/0.96)_0%,rgb(4_18_38/0.86)_42%,rgb(4_18_38/0.35)_75%,rgb(4_18_38/0.2)_100%)]"
      />
      <div aria-hidden="true" className="grid-texture absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-brand-950 to-transparent" />

      <div className="container grid items-end gap-14 pb-20 pt-36 sm:pt-40 lg:grid-cols-[1.25fr_0.75fr] lg:pb-28 lg:pt-48">
        <div data-reveal>
          <p className="eyebrow eyebrow-light">Polymers · Petrochemicals · Industrial materials</p>
          <h1 className="mt-6 text-display-xl font-semibold text-white">
            Industrial materials.
            <span className="block text-accent-200">Sourced smarter.</span>
            <span className="block">Delivered better.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-100/85 sm:text-xl">
            Reliable polymers, petrochemicals and industrial materials - sourced from verified
            suppliers, traded transparently and delivered through one technology-driven platform.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <TrackedLink
              href="/materials"
              event="explore_materials_click"
              eventProps={{ location: "hero" }}
              size="lg"
              arrow
            >
              Explore Materials
            </TrackedLink>
            <TrackedLink
              href="/request-credit"
              event="request_credit_click"
              eventProps={{ location: "hero" }}
              variant="light"
              size="lg"
            >
              Request Credit
            </TrackedLink>
            <TrackedLink
              href="/buy-sell"
              event="buy_cta_click"
              eventProps={{ location: "hero" }}
              variant="link"
              className="ml-2 text-white hover:text-accent-200"
              arrow
            >
              Buy &amp; Sell
            </TrackedLink>
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties} className="hidden sm:block">
          <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100/70">
                Procurement journey
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[0.7rem] font-medium text-brand-50">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-300" />
                One platform
              </span>
            </div>
            <ol className="mt-6 space-y-1">
              {FLOW.map((step, index) => (
                <li key={step.title} className="relative flex gap-4 pb-5 last:pb-0">
                  {index < FLOW.length - 1 ? (
                    <span aria-hidden="true" className="absolute left-[19px] top-10 h-[calc(100%-2.75rem)] w-px bg-gradient-to-b from-accent-300/60 to-white/10" />
                  ) : null}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                    <step.icon aria-hidden="true" className="h-[18px] w-[18px] text-accent-200" />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-semibold text-white">{step.title}</span>
                    <span className="mt-0.5 block text-sm text-brand-100/70">{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-brand-800">
              <PackageCheck aria-hidden="true" className="h-5 w-5 text-accent" />
              <p className="text-sm font-medium">Delivered with documentation at every step</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
