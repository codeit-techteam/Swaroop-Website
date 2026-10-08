import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Handshake, Scale, ShieldCheck, Smartphone, Store, Factory, LayoutDashboard } from "lucide-react";
import { Benefits } from "@/components/sections/benefits";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";
import manufacturingImage from "@/public/images/industry-manufacturing.webp";
import refineryImage from "@/public/images/hero-refinery-granules.webp";

export const metadata: Metadata = pageMetadata({
  title: "About Swaroop",
  description:
    "Swaroop is building India's connected platform for industrial materials — bringing verified supply, structured procurement, logistics and business credit together for buyers and sellers.",
  path: "/about",
});

const PRINCIPLES = [
  { icon: ShieldCheck, title: "Trust by design", detail: "Verification, standard grades and recorded order history are built into the platform, not bolted on." },
  { icon: Eye, title: "Transparency", detail: "Every order moves through visible stages, so buyers and sellers always know where things stand." },
  { icon: Scale, title: "Fairness", detail: "Confidential purchase requests and a neutral process keep the marketplace balanced for both sides." },
  { icon: Handshake, title: "Long-term partnership", detail: "We succeed when our customers and suppliers grow — order after order." },
];

const ECOSYSTEM = [
  { icon: Store, title: "Customer platform", detail: "Web and mobile apps for buyers to browse grades, request materials, pay, track orders and apply for credit." },
  { icon: Factory, title: "Seller platform", detail: "Inventory, offers, purchase-request responses, dispatch and settlements for verified suppliers." },
  { icon: LayoutDashboard, title: "Operations & credit desk", detail: "Swaroop's internal teams manage verification, procurement, logistics and credit review." },
  { icon: Smartphone, title: "One backend, every channel", detail: "Website, web apps and mobile app share the same secure Swaroop platform and data." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Swaroop"
        breadcrumb={{ name: "About", path: "/about" }}
        image={refineryImage}
        imageAlt="Petrochemical plant behind a pile of polymer granules"
        title="We're rebuilding how India buys industrial materials."
        description="Industrial procurement still runs on phone calls, scattered price lists and paperwork. Swaroop brings it onto one transparent, technology-driven platform."
      />

      <section aria-labelledby="mission-heading" className="section bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Our mission"
              title={<span id="mission-heading">Make industrial materials simple to source, trade and finance.</span>}
            />
            <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                Swaroop connects manufacturers, traders, contractors and suppliers of polymers,
                petrochemicals and industrial materials on a single platform.
              </p>
              <p>
                We standardise what is being traded through our Grade Master, verify who is trading
                it, and run every order through a structured process — from purchase request and
                commercial confirmation to payment, dispatch and delivery. For eligible buyers, we
                add managed business credit.
              </p>
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
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

      <section aria-labelledby="principles-heading" className="section bg-paper">
        <div className="container">
          <SectionHeading eyebrow="What we stand for" title={<span id="principles-heading">Principles that shape the platform.</span>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((item, index) => (
              <li key={item.title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties} className="card p-7">
                <item.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ecosystem-heading" className="section bg-white">
        <div className="container">
          <SectionHeading eyebrow="The Swaroop ecosystem" title={<span id="ecosystem-heading">One platform, built for every participant.</span>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {ECOSYSTEM.map((item, index) => (
              <li key={item.title} data-reveal style={{ "--reveal-delay": `${(index % 2) * 80}ms` } as React.CSSProperties} className="card flex gap-5 p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <item.icon aria-hidden="true" className="h-[22px] w-[22px]" />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold text-brand-800">{item.title}</span>
                  <span className="mt-2 block leading-relaxed text-ink-muted">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Benefits />

      <section id="careers" aria-labelledby="careers-heading" className="section scroll-mt-24 bg-paper">
        <div className="container">
          <div data-reveal className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-line bg-white p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow">Careers</p>
              <h2 id="careers-heading" className="mt-4 text-display-md font-semibold">
                Help build the future of industrial trade.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                We're always keen to hear from people who know industrial materials, procurement,
                logistics, credit or technology. Introduce yourself and tell us where you'd make an
                impact.
              </p>
            </div>
            <ButtonLink href="/contact?topic=OTHER" size="lg" arrow>
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
