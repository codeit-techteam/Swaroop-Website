import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Benefits } from "@/components/sections/benefits";
import { BuySell } from "@/components/sections/buy-sell";
import { CreditSection } from "@/components/sections/credit-section";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { LogisticsSection } from "@/components/sections/logistics";
import { MaterialsEcosystem } from "@/components/sections/materials-ecosystem";
import { NetworkSection } from "@/components/sections/network";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Technology } from "@/components/sections/technology";
import { TrustStrip } from "@/components/sections/trust-strip";
import { VerifiedSupply } from "@/components/sections/verified-supply";
import { FAQ_ITEMS } from "@/content/faq";
import { SITE } from "@/content/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <Hero />
      <TrustStrip />
      <MaterialsEcosystem />
      <BuySell />
      <ProcessTimeline />
      <VerifiedSupply />
      <Technology />
      <CreditSection />
      <NetworkSection />
      <LogisticsSection />
      <Benefits />
      <Industries />
      <InsightsPreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}
