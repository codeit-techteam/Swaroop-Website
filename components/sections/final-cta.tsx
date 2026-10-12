import { TrackedLink } from "@/components/ui/tracked-link";
import { platformLinks } from "@/lib/env";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-white py-20 sm:py-24">
      <div className="container">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 px-6 py-16 text-center text-white shadow-lift sm:px-12 sm:py-20 lg:py-24"
        >
          <div aria-hidden="true" className="grid-texture absolute inset-0" />
          <div aria-hidden="true" className="absolute -bottom-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-accent/40 blur-[110px]" />
          <div className="relative mx-auto max-w-3xl">
            <h2 id="final-cta-heading" className="text-display-lg font-semibold text-white">
              Move your industrial procurement forward.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-brand-100/80">
              Verified supply, structured buying, coordinated delivery and business credit - on one
              platform built for Indian industry.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <TrackedLink href="/materials" event="explore_materials_click" eventProps={{ location: "final_cta" }} variant="light" size="lg">
                Explore Materials
              </TrackedLink>
              <TrackedLink href="/request-credit" event="request_credit_click" eventProps={{ location: "final_cta" }} variant="outline-light" size="lg">
                Request Credit
              </TrackedLink>
              <TrackedLink
                href={platformLinks.customerRegister}
                external
                event="platform_cta_click"
                eventProps={{ location: "final_cta", platform: "customer" }}
                size="lg"
                arrow
              >
                Get Started
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
