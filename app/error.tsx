"use client";

import { RefreshCw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-paper pb-28 pt-40">
      <div className="container max-w-xl text-center">
        <p className="eyebrow justify-center">Something went wrong</p>
        <h1 className="mt-5 text-display-md font-semibold">We hit an unexpected problem.</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Please try again. If the problem continues, contact the PolyStoreX team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} size="lg">
            <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
          </Button>
          <ButtonLink href="/contact" variant="ghost" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
