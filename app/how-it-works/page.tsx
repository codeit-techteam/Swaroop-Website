import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { LogisticsSection } from "@/components/sections/logistics";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Technology } from "@/components/sections/technology";
import { TrackedLink } from "@/components/ui/tracked-link";
import { FAQ_ITEMS } from "@/content/faq";
import { platformLinks } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import plantImage from "@/public/images/process-plant.webp";

export const metadata: Metadata = pageMetadata({
  title: "How Petrotrade Works - From Grade to Delivery",
  description:
    "See how industrial procurement works on Petrotrade: choose a grade, review verified offers, submit a purchase request, confirm terms, pay or use credit, and track dispatch through delivery.",
  path: "/how-it-works",
});

const RELEVANT_FAQ = FAQ_ITEMS.filter((item) =>
  ["How does procurement work?", "How are orders tracked?", "How does delivery work?"].includes(item.question),
);

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        breadcrumb={{ name: "How It Works", path: "/how-it-works" }}
        image={plantImage}
        imageAlt="Stainless steel process piping in an industrial plant"
        title="Industrial buying, made structured and visible."
        description="Every Petrotrade order follows the same transparent lifecycle - so you always know what happens next, and who is responsible for it."
      >
        <TrackedLink href={platformLinks.customerRegister} external event="platform_cta_click" eventProps={{ location: "how_hero", platform: "customer" }} size="lg" arrow>
          Get Started
        </TrackedLink>
      </PageHero>
      <ProcessTimeline />
      <Technology />
      <LogisticsSection />
      <FaqSection items={RELEVANT_FAQ} title="Orders and delivery." />
      <FinalCta />
    </>
  );
}
