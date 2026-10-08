import { BadgeCheck, Boxes, ClipboardCheck, FileCheck2, Network, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const BENEFITS = [
  { icon: ClipboardCheck, title: "Better procurement", detail: "Standardised grades, comparable offers and one structured buying process." },
  { icon: BadgeCheck, title: "Verified supply", detail: "Trade only with businesses that have passed GST, PAN and KYC checks." },
  { icon: Boxes, title: "Reliable delivery", detail: "Coordinated dispatch and shipment milestones for every order." },
  { icon: Wallet, title: "Flexible finance", detail: "Advance, on-delivery or approved business credit — chosen per order." },
  { icon: FileCheck2, title: "Digital documentation", detail: "Invoices, delivery and compliance documents stored with each order." },
  { icon: Network, title: "One connected platform", detail: "Materials, procurement, logistics and finance in a single account." },
];

export function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Why Swaroop"
          align="center"
          title={<span id="benefits-heading">Built for the way industry actually buys.</span>}
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <li
              key={benefit.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
              className="group relative bg-white p-8 transition-colors duration-300 hover:bg-paper sm:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-card transition-transform duration-300 group-hover:-translate-y-1">
                <benefit.icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-7 text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{benefit.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
