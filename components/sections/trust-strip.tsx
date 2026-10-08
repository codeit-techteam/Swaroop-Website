import { BadgeCheck, CreditCard, MapPin, MonitorSmartphone, Truck } from "lucide-react";

const ITEMS = [
  { icon: MapPin, title: "Pan-India reach", detail: "Built for buyers and suppliers across India" },
  { icon: BadgeCheck, title: "Verified supply", detail: "GST, PAN and KYC-checked businesses" },
  { icon: MonitorSmartphone, title: "Digital procurement", detail: "Grades, offers and orders online" },
  { icon: Truck, title: "Reliable logistics", detail: "Coordinated dispatch to delivery" },
  { icon: CreditCard, title: "Business credit", detail: "Structured credit for eligible buyers" },
];

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="border-b border-line bg-white">
      <div className="container py-12 lg:py-14">
        <h2 id="trust-heading" data-reveal className="text-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink-subtle">
          Built for India's industrial ecosystem
        </h2>
        <ul className="mt-9 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              className="flex items-start gap-3.5 lg:flex-col lg:items-center lg:text-center"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <item.icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold text-brand-800">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
