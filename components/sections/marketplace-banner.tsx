import Image from "next/image";
import { Bell, ClipboardList, IndianRupee, MapPin, ShoppingCart, Zap } from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-link";
import { platformLinks } from "@/lib/env";
import dashboard from "@/public/images/marketplace-dashboard.webp";

const HIGHLIGHTS = [
  { icon: IndianRupee, title: "Real-time prices", detail: "Live rates updating every 2 minutes." },
  { icon: MapPin, title: "Location-based rates", detail: "Prices specific to your city, zone and suppliers." },
  { icon: Bell, title: "Live alerts", detail: "Get notified when prices cross your thresholds." },
  { icon: Zap, title: "Quick decisions", detail: "From checking to deciding in seconds." },
] as const;

export function MarketplaceBanner() {
  return (
    <section
      id="marketplace"
      aria-labelledby="marketplace-heading"
      className="relative overflow-hidden bg-[linear-gradient(110deg,#ffffff_0%,#f1f7fe_38%,#d9eafc_70%,#bcd9fb_100%)] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(30,111,255,0.28),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(255,255,255,0.9),transparent_40%)]"
      />
      <div
        aria-hidden="true"
        className="grid-texture-light pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_right,#000,transparent_50%)]"
      />

      <div className="container relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
        <div>
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-500">
              Blind B2B Marketplace
            </p>
            <h2
              id="marketplace-heading"
              className="mt-5 text-[clamp(2.2rem,3.9vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-brand-800"
            >
              Source Petrochemicals
              <span className="block bg-gradient-to-r from-accent-600 to-accent bg-clip-text text-transparent">
                with Confidence
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
              Discover verified grades, compare market prices and procure directly through a secure
              blind marketplace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href={platformLinks.customerHome}
                external
                event="platform_cta_click"
                eventProps={{ location: "marketplace_banner", platform: "customer", target: "browse_marketplace" }}
                size="lg"
                arrow
              >
                <ShoppingCart aria-hidden="true" className="h-5 w-5" />
                Browse Marketplace
              </TrackedLink>
              <TrackedLink
                href={platformLinks.customerPurchaseRequest}
                external
                event="buy_cta_click"
                eventProps={{ location: "marketplace_banner", platform: "customer", target: "purchase_request" }}
                variant="ghost"
                size="lg"
                className="border-accent/30 text-accent-600 hover:border-accent/60 hover:bg-white"
              >
                <ClipboardList aria-hidden="true" className="h-5 w-5" />
                Create Purchase Request
              </TrackedLink>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-brand-100/70 pt-8 sm:grid-cols-4 sm:gap-x-5">
            {HIGHLIGHTS.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="group"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white bg-white/90 text-accent shadow-[0_10px_24px_-14px_rgb(11_46_89/0.5)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-white">
                  <item.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <h3 className="mt-4 text-sm font-semibold leading-tight text-brand-800">{item.title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-snug text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="relative lg:-mr-4"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-[12%] bottom-[6%] h-20 rounded-full bg-brand-900/25 blur-3xl"
          />
          <a
            href={platformLinks.customerHome}
            rel="noopener"
            aria-label="Open the PolyStoreX marketplace"
            className="group relative block rounded-3xl focus-visible:ring-offset-4"
          >
            <Image
              src={dashboard}
              alt="PolyStoreX customer web portal dashboard showing the blind marketplace, live market prices per grade, available credit and import trading."
              sizes="(min-width: 1024px) 900px, 100vw"
              className="relative h-auto w-full select-none transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01] [mask-image:linear-gradient(to_bottom,transparent,#000_5%,#000_93%,transparent),linear-gradient(to_right,transparent,#000_5%,#000_97%,transparent)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_5%,#000_93%,transparent),linear-gradient(to_right,transparent,#000_5%,#000_97%,transparent)] [-webkit-mask-composite:source-in]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
