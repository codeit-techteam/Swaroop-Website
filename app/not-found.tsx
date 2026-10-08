import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-brand-900 pb-28 pt-40 text-white">
      <div aria-hidden="true" className="grid-texture absolute inset-0" />
      <div className="container relative max-w-2xl text-center">
        <p className="eyebrow eyebrow-light justify-center">Error 404</p>
        <h1 className="mt-5 text-display-md font-semibold text-white sm:text-display-lg">
          This page isn't on the network.
        </h1>
        <p className="mt-5 text-lg text-brand-100/80">
          The page you're looking for may have moved. Let's get you back to sourcing.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/materials" variant="outline-light" size="lg">
            Explore materials
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
