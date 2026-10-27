import type { Metadata } from "next";
import { BuySell } from "@/components/sections/buy-sell";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { VerifiedSupply } from "@/components/sections/verified-supply";
import { TrackedLink } from "@/components/ui/tracked-link";
import { FAQ_ITEMS } from "@/content/faq";
import { platformLinks } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import warehouseImage from "@/public/images/warehouse.webp";

export const metadata: Metadata = pageMetadata({
  title: "Buy & Sell Industrial Materials",
  description:
    "Buy polymers and petrochemicals from verified suppliers, or reach qualified industrial buyers as a seller - with structured procurement, logistics and settlements on PolyStoreX.",
  path: "/buy-sell",
});

const RELEVANT_FAQ = FAQ_ITEMS.filter((item) =>
  ["How can I buy materials?", "How can I sell materials?", "How does procurement work?", "How is KYC handled?"].includes(item.question),
);

export default function BuySellPage() {
  return (
    <>
      <PageHero
        eyebrow="Buy & Sell"
        breadcrumb={{ name: "Buy & Sell", path: "/buy-sell" }}
        image={warehouseImage}
        imageAlt="Warehouse stocked with polymer sacks on pallets"
        title="A marketplace engineered for industrial trade."
        description="Buyers source verified material against standard grades. Sellers reach qualified demand. PolyStoreX manages confirmation, logistics and settlement in between."
      >
        <TrackedLink href={platformLinks.customerRegister} external event="buy_cta_click" eventProps={{ location: "buy_sell_hero" }} size="lg" arrow>
          Start buying
        </TrackedLink>
        <TrackedLink href={platformLinks.sellerRegister} external event="sell_cta_click" eventProps={{ location: "buy_sell_hero" }} variant="outline-light" size="lg">
          Sell With PolyStoreX
        </TrackedLink>
      </PageHero>
      <BuySell showHeading={false} />
      <VerifiedSupply />
      <FaqSection items={RELEVANT_FAQ} title="Buying and selling, explained." />
      <FinalCta />
    </>
  );
}
