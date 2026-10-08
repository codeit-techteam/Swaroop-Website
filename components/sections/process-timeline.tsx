import {
  CreditCard,
  FileSignature,
  Handshake,
  PackageCheck,
  ScanSearch,
  Send,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export const PROCESS_STEPS = [
  {
    icon: ScanSearch,
    title: "Choose material",
    detail: "Find the exact grade you need in the Swaroop Grade Master.",
  },
  {
    icon: Handshake,
    title: "Explore available offers",
    detail: "Review offers from verified suppliers against that grade.",
  },
  {
    icon: Send,
    title: "Submit purchase request",
    detail: "Share quantity, delivery location and payment preference.",
  },
  {
    icon: FileSignature,
    title: "Commercial confirmation",
    detail: "Swaroop confirms price, quantity and terms with you.",
  },
  {
    icon: CreditCard,
    title: "Payment / credit",
    detail: "Pay in advance or use an approved business credit line.",
  },
  {
    icon: Truck,
    title: "Dispatch",
    detail: "The order is dispatched with invoices and transport documents.",
  },
  {
    icon: PackageCheck,
    title: "Delivery",
    detail: "Material reaches your site and the order is closed out.",
  },
];

export function ProcessTimeline({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="how-it-works" aria-labelledby="process-heading" className="section relative overflow-hidden bg-brand-900 text-white">
      <div aria-hidden="true" className="grid-texture absolute inset-0" />
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="container relative">
        <SectionHeading
          as={headingLevel}
          eyebrow="How Swaroop works"
          tone="light"
          align="center"
          title={<span id="process-heading">From grade to doorstep in seven clear steps.</span>}
          description="One structured, transparent order lifecycle — the same for every buyer, every material and every order."
        />

        <ol className="relative mt-16 grid gap-0 lg:mt-20 lg:grid-cols-7 lg:gap-4">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-2 w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <line
              x1="7"
              y1="1"
              x2="93"
              y2="1"
              stroke="rgb(117 171 255 / 0.5)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              className="flow-line animate-flow-dash"
            />
          </svg>
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
            >
              {index < PROCESS_STEPS.length - 1 ? (
                <span aria-hidden="true" className="absolute left-7 top-14 h-[calc(100%-3.5rem)] w-px border-l border-dashed border-accent-300/40 lg:hidden" />
              ) : null}
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-brand-800 shadow-[0_0_0_6px_rgb(4_18_38)]">
                <step.icon aria-hidden="true" className="h-6 w-6 text-accent-200" />
              </span>
              <div className="pt-1 lg:pt-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-accent-300">
                  STEP {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100/70">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
