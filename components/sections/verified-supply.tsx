import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Fingerprint,
  Layers,
  Receipt,
  Route,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import warehouseImage from "@/public/images/warehouse.webp";

const POINTS = [
  { icon: Building2, title: "Verified businesses", detail: "Every buyer and seller is onboarded as a registered business." },
  { icon: Fingerprint, title: "KYC review", detail: "Business documents are reviewed by the Petrotrade compliance team." },
  { icon: Receipt, title: "GST verification", detail: "GSTINs are verified server-side with our verification partner." },
  { icon: BadgeCheck, title: "PAN verification", detail: "PAN details are matched and only masked values are displayed." },
  { icon: Layers, title: "Grade Master", detail: "Offers map to standardised grades, so specifications stay consistent." },
  { icon: FileCheck2, title: "Quality documentation", detail: "Grade and order documents stay attached to every transaction." },
  { icon: ClipboardCheck, title: "Structured procurement", detail: "Requests, confirmations and orders follow one defined process." },
  { icon: Route, title: "Transparent order lifecycle", detail: "Every status change is recorded from confirmation to delivery." },
];

const CHAIN = ["Supplier", "Verification", "Grade", "Offer", "Procurement", "Delivery"];

export function VerifiedSupply() {
  return (
    <section aria-labelledby="supply-heading" className="section bg-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Verified supply"
              title={<span id="supply-heading">Supply you can trust.</span>}
              description="Trust is designed into the platform - from who can sell, to what is being sold, to how every order is executed."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {POINTS.map((point, index) => (
                <li
                  key={point.title}
                  data-reveal
                  style={{ "--reveal-delay": `${(index % 2) * 80}ms` } as React.CSSProperties}
                  className="flex gap-3.5"
                >
                  <point.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>
                    <span className="block font-semibold text-brand-800">{point.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{point.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <Image
                src={warehouseImage}
                alt="Pallets of sealed polymer sacks stored in a modern warehouse"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-brand-950/70 p-5 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-200">
                  The Petrotrade trust chain
                </p>
                <ol className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-medium text-white">
                  {CHAIN.map((step, index) => (
                    <li key={step} className="flex items-center gap-1">
                      <span className="rounded-full bg-white/10 px-3 py-1.5">{step}</span>
                      {index < CHAIN.length - 1 ? (
                        <ChevronRight aria-hidden="true" className="h-4 w-4 text-accent-300" />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
