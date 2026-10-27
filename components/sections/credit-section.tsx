import { ClipboardCheck, FileUp, Gauge, LineChart } from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-link";

const CARDS = [
  {
    icon: Gauge,
    title: "Check credit eligibility",
    detail: "Sign in with your business account and see whether a credit application can be started.",
  },
  {
    icon: ClipboardCheck,
    title: "Apply using business details",
    detail: "Your verified GST and PAN details are reused - just add your credit requirement.",
  },
  {
    icon: FileUp,
    title: "Upload financial documents",
    detail: "GST certificate, bank statements and ITR or financials, uploaded securely.",
  },
  {
    icon: LineChart,
    title: "Track your application",
    detail: "Follow every review stage, respond to document requests and see the decision.",
  },
];

export function CreditSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="credit" aria-labelledby="credit-heading" className="section relative overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="grid-texture absolute inset-0" />
      <div aria-hidden="true" className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[140px]" />
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]" />
      <div className="container relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div data-reveal>
          <p className="eyebrow eyebrow-light">Business credit</p>
          <Heading id="credit-heading" className="mt-4 text-display-lg font-semibold text-white">
            Business credit built around your procurement.
          </Heading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100/80">
            Access structured credit options designed to help eligible businesses manage working
            capital and purchase industrial materials with confidence.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-100/60">
            Every application is reviewed by the PolyStoreX credit team. Approval, limits and payment
            terms depend on eligibility and are never granted automatically.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <TrackedLink
              href="/request-credit"
              event="request_credit_click"
              eventProps={{ location: "credit_section" }}
              size="lg"
              arrow
            >
              Request Credit
            </TrackedLink>
            <TrackedLink
              href="/credit"
              event="platform_cta_click"
              eventProps={{ location: "credit_section", target: "credit_page" }}
              variant="outline-light"
              size="lg"
            >
              How credit works
            </TrackedLink>
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2">
          {CARDS.map((card, index) => (
            <li
              key={card.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.07] sm:[&:nth-child(even)]:translate-y-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white shadow-[0_10px_30px_-10px_rgb(30_111_255/0.9)]">
                  <card.icon aria-hidden="true" className="h-[22px] w-[22px]" />
                </span>
                <span className="font-display text-4xl font-semibold text-white/10">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-100/70">{card.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
