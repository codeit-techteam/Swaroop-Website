import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { platformLinks } from "@/lib/env";

const BUY = [
  "Browse grades from the Petrotrade Grade Master",
  "Compare available offers",
  "Submit purchase requests",
  "Flexible payment options, including business credit",
  "Delivery coordination",
  "Order tracking from confirmation to delivery",
];

const SELL = [
  "Manage inventory across locations",
  "Publish offers against standardised grades",
  "Receive qualified purchase requests",
  "Respond to live demand",
  "Manage orders and dispatch",
  "Track settlements",
];

export function BuySell({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="buy-sell" aria-labelledby="buy-sell-heading" className="section bg-white">
      <div className="container">
        {showHeading ? (
          <SectionHeading
            eyebrow="Buy or sell"
            align="center"
            title={<span id="buy-sell-heading">Two sides of one trusted marketplace.</span>}
            description="Buyers get verified supply and structured procurement. Sellers reach qualified industrial demand. Petrotrade runs the process in between."
          />
        ) : (
          <h2 id="buy-sell-heading" className="sr-only">Buy or sell on Petrotrade</h2>
        )}

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article data-reveal className="card relative flex flex-col overflow-hidden p-8 sm:p-10 lg:p-12">
            <div aria-hidden="true" className="grid-texture-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
            <div className="relative flex flex-1 flex-col">
              <p className="eyebrow">Buy materials</p>
              <h3 className="mt-4 text-display-md font-semibold">Source the right material for your business.</h3>
              <ul className="mt-8 grid gap-3.5">
                {BUY.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.98rem] text-ink-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-10">
                <TrackedLink
                  href={platformLinks.customerRegister}
                  external
                  event="buy_cta_click"
                  eventProps={{ location: "buy_sell_section" }}
                  size="lg"
                  arrow
                >
                  Explore Buying
                </TrackedLink>
                <TrackedLink
                  href={platformLinks.customerLogin}
                  external
                  event="platform_cta_click"
                  eventProps={{ location: "buy_sell_section", platform: "customer" }}
                  variant="ghost"
                  size="lg"
                >
                  Customer sign in
                </TrackedLink>
              </div>
            </div>
          </article>

          <article
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-800 p-8 text-white shadow-lift sm:p-10 lg:p-12"
          >
            <div aria-hidden="true" className="grid-texture absolute inset-0" />
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="relative flex flex-1 flex-col">
              <p className="eyebrow eyebrow-light">Sell materials</p>
              <h3 className="mt-4 text-display-md font-semibold text-white">Reach qualified industrial buyers.</h3>
              <ul className="mt-8 grid gap-3.5">
                {SELL.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.98rem] text-brand-100/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-200">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-10">
                <TrackedLink
                  href={platformLinks.sellerRegister}
                  external
                  event="sell_cta_click"
                  eventProps={{ location: "buy_sell_section" }}
                  variant="light"
                  size="lg"
                  arrow
                >
                  Sell With Petrotrade
                </TrackedLink>
                <TrackedLink
                  href={platformLinks.sellerLogin}
                  external
                  event="platform_cta_click"
                  eventProps={{ location: "buy_sell_section", platform: "seller" }}
                  variant="outline-light"
                  size="lg"
                >
                  Seller sign in
                </TrackedLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
