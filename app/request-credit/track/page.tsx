import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPanel } from "@/components/credit/flow-ui";
import { TrackApplication } from "@/components/credit/track-application";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Track Credit Application",
  description: "Track the status of your Petrotrade business credit application.",
  path: "/request-credit/track",
  noIndex: true,
});

export default function TrackCreditPage() {
  return (
    <>
      <PageHero
        eyebrow="Request credit"
        breadcrumb={{ name: "Track Application", path: "/request-credit/track" }}
        title="Track your credit application."
        description="See where your request stands, respond to document requests and review every update."
      />
      <section className="section bg-paper">
        <div className="container max-w-4xl">
          <Suspense fallback={<LoadingPanel label="Loading…" />}>
            <TrackApplication />
          </Suspense>
        </div>
      </section>
    </>
  );
}
