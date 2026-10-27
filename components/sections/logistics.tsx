import Image from "next/image";
import { ArrowDown, ArrowRight, Eye, FileText, PackageSearch, Route, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import logisticsImage from "@/public/images/logistics-hub.webp";

const STAGES = ["Purchase", "Commercial confirmation", "Dispatch", "Shipment", "Delivery"];

const FEATURES = [
  { icon: Route, title: "Delivery coordination", detail: "PolyStoreX coordinates pickup and delivery for each confirmed order." },
  { icon: PackageSearch, title: "Shipment tracking", detail: "Follow shipment status updates and milestones from your dashboard." },
  { icon: FileText, title: "Documentation", detail: "Invoices and transport documents travel with every shipment." },
  { icon: Truck, title: "Dispatch management", detail: "Dispatch is planned against confirmed quantities and locations." },
  { icon: Eye, title: "Delivery visibility", detail: "Know where your order stands at every recorded milestone." },
];

export function LogisticsSection() {
  return (
    <section aria-labelledby="logistics-heading" className="section bg-paper">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Logistics"
            title={<span id="logistics-heading">Every order tracked, from confirmation to dispatch.</span>}
            description="Logistics is part of the order, not an afterthought. Every shipment moves through clear, recorded milestones."
          />
          <ol data-reveal aria-label="Order stages" className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            {STAGES.map((stage, index) => (
              <li key={stage} className="flex items-center gap-2 sm:gap-2">
                <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm">
                  {stage}
                </span>
                {index < STAGES.length - 1 ? (
                  <>
                    <ArrowRight aria-hidden="true" className="hidden h-4 w-4 text-accent sm:block" />
                    <ArrowDown aria-hidden="true" className="ml-5 h-4 w-4 text-accent sm:hidden" />
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div data-reveal className="relative min-h-[320px] overflow-hidden rounded-3xl">
            <Image
              src={logisticsImage}
              alt="Cargo trucks lined up at the loading docks of a logistics hub at dusk"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-brand-950/70 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 max-w-sm font-display text-2xl font-semibold leading-snug text-white">
              Dispatch, shipment and delivery - tracked as one order.
            </p>
          </div>
          <ul className="grid gap-3">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                className="card flex gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <feature.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-brand-800">{feature.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{feature.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
