import {
  BadgeCheck,
  ClipboardList,
  CreditCard,
  FileText,
  Landmark,
  Store,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: ClipboardList, title: "Digital Procurement", detail: "Purchase requests, confirmations and orders handled online, with a full audit trail." },
  { icon: Store, title: "Live Marketplace", detail: "Offers from verified suppliers, organised by Grade Master grade." },
  { icon: BadgeCheck, title: "Verified Supply", detail: "GST, PAN and KYC checks before a business can trade." },
  { icon: Truck, title: "Smart Logistics", detail: "Dispatch, shipment and delivery milestones in one view." },
  { icon: FileText, title: "Documents", detail: "Invoices, delivery records and compliance documents stored securely." },
  { icon: Landmark, title: "Payments", detail: "Advance and on-delivery payment flows with clear payment status." },
  { icon: CreditCard, title: "Business Credit", detail: "Managed credit lines for eligible buyers, available at checkout." },
];

export function Technology() {
  return (
    <section aria-labelledby="tech-heading" className="section bg-paper">
      <div className="container">
        <SectionHeading
          eyebrow="Technology"
          title={<span id="tech-heading">Industrial procurement, rebuilt for speed.</span>}
          description="PolyStoreX brings procurement, inventory, pricing, logistics and finance into one connected ecosystem - so buyers, sellers and our operations team work from the same source of truth."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <li
              key={feature.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as React.CSSProperties}
              className={cn(
                "card group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                index === 0 && "sm:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-between lg:bg-brand-800 lg:text-white",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand transition-transform duration-300 group-hover:scale-105",
                  index === 0 && "lg:bg-white/10 lg:text-accent-200",
                )}
              >
                <feature.icon aria-hidden="true" className="h-[22px] w-[22px]" />
              </span>
              <div>
                <h3 className={cn("mt-6 text-lg font-semibold", index === 0 && "lg:text-3xl lg:text-white")}>
                  {feature.title}
                </h3>
                <p className={cn("mt-2 text-[0.95rem] leading-relaxed text-ink-muted", index === 0 && "lg:max-w-sm lg:text-lg lg:text-brand-100/80")}>
                  {feature.detail}
                </p>
              </div>
              {index === 0 ? (
                <div aria-hidden="true" className="absolute -bottom-20 -right-20 hidden h-64 w-64 rounded-full border border-white/10 lg:block">
                  <div className="absolute inset-8 rounded-full border border-white/10" />
                  <div className="absolute inset-16 rounded-full border border-accent/40" />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
