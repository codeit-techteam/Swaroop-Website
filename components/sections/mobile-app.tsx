import Image from "next/image";
import { Bell, Handshake, IndianRupee, MapPin, ShoppingCart, Smartphone, Zap } from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-link";
import { platformLinks } from "@/lib/env";
import showcase from "@/public/images/mobile-app-showcase.webp";

const FEATURES = [
  {
    icon: IndianRupee,
    title: "Real-time prices",
    detail: "Live rates updating every 2 minutes — no calls, no waiting.",
  },
  {
    icon: MapPin,
    title: "Location-based rates",
    detail: "Prices specific to your city, your zone, your supplier network.",
  },
  {
    icon: Bell,
    title: "Live alerts",
    detail: "Get notified when prices cross thresholds you care about.",
  },
  {
    icon: Zap,
    title: "Quick decisions",
    detail: "From “checking” to “deciding” in seconds, with one-tap actions.",
  },
] as const;

export function MobileApp() {
  return (
    <section
      id="mobile-app"
      aria-labelledby="mobile-app-heading"
      className="relative overflow-hidden bg-[linear-gradient(115deg,#f8fbff_0%,#eaf3fd_48%,#d6e8fb_100%)] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,rgba(120,176,255,0.45),transparent_45%),radial-gradient(ellipse_at_0%_100%,rgba(255,255,255,0.9),transparent_40%)]"
      />
      <div aria-hidden="true" className="grid-texture-light pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_right,#000,transparent_55%)]" />

      <div className="container relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
        <div>
          <div data-reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 shadow-sm backdrop-blur">
              <Smartphone aria-hidden="true" className="h-3.5 w-3.5" />
              Mobile App
            </p>
            <h2
              id="mobile-app-heading"
              className="mt-6 text-[clamp(2.4rem,4.6vw,3.9rem)] font-bold leading-[1.04] tracking-[-0.035em] text-brand-800"
            >
              Buy materials.
              <span className="block bg-gradient-to-r from-accent-600 to-accent bg-clip-text text-transparent">
                Or Sell through us.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
              Your complete petrochemical trading platform in one app. Real-time prices, verified
              suppliers, import trading and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href={platformLinks.customerRegister}
                external
                event="buy_cta_click"
                eventProps={{ location: "mobile_app", platform: "customer" }}
                size="lg"
                arrow
              >
                <ShoppingCart aria-hidden="true" className="h-5 w-5" />
                For Buyers
              </TrackedLink>
              <TrackedLink
                href={platformLinks.sellerRegister}
                external
                event="sell_cta_click"
                eventProps={{ location: "mobile_app", platform: "seller" }}
                variant="ghost"
                size="lg"
                arrow
                className="border-accent/30 text-accent-600 hover:border-accent/60 hover:bg-white"
              >
                <Handshake aria-hidden="true" className="h-5 w-5" />
                For Sellers
              </TrackedLink>
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="group flex gap-3.5 rounded-2xl border border-white bg-white/85 p-4 shadow-[0_12px_32px_-20px_rgb(11_46_89/0.45)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-[0_10px_20px_-10px_rgb(30_111_255/0.95)] transition-transform duration-300 group-hover:scale-105">
                  <feature.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.95rem] font-semibold leading-tight text-brand-800">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-ink-muted">{feature.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="relative">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
          />
          <Image
            src={showcase}
            alt="PolyStoreX app on a phone held in hand, surrounded by features: your locations, brand promotion, news and insights, order tracking, support, grade search, favourites and profile."
            sizes="(min-width: 1024px) 740px, 100vw"
            className="relative h-auto w-full select-none [mask-image:linear-gradient(to_bottom,transparent,#000_6%,#000_92%,transparent),linear-gradient(to_right,transparent,#000_6%,#000_96%,transparent)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_6%,#000_92%,transparent),linear-gradient(to_right,transparent,#000_6%,#000_96%,transparent)] [-webkit-mask-composite:source-in]"
          />
        </div>
      </div>
    </section>
  );
}
