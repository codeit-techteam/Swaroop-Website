import type { Metadata } from "next";
import { FileCheck2, FileText, Landmark, Receipt, ShieldCheck } from "lucide-react";
import { CreditSection } from "@/components/sections/credit-section";
import { FaqSection } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { FAQ_ITEMS } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Business Credit for Industrial Procurement",
  description:
    "Apply for structured business credit on PolyStoreX. Submit your requirement and financial documents online, track the review, and use an approved credit line at checkout.",
  path: "/credit",
});

const DOCUMENTS = [
  { icon: Receipt, title: "GST registration certificate", required: true },
  { icon: Landmark, title: "Bank statement - last 6 months", required: true },
  { icon: FileText, title: "ITR / financial statements - last 2 years", required: true },
  { icon: FileCheck2, title: "GST returns (GSTR-3B) - last 6 months", required: false },
  { icon: FileCheck2, title: "Cancelled cheque", required: false },
  { icon: FileCheck2, title: "Business registration certificate", required: false },
];

const STAGES = [
  { status: "Submitted", detail: "Your application is queued for the PolyStoreX credit team." },
  { status: "Under review", detail: "Documents are verified and the application is assessed. This can include a credit insurance review." },
  { status: "Documents required", detail: "If anything is missing, you'll be asked to upload it and resubmit." },
  { status: "Decision", detail: "The application is approved (fully or partially) or declined, with a message from the credit team." },
  { status: "Credit active", detail: "Approved limits and payment terms become available at checkout." },
];

const CREDIT_FAQ = FAQ_ITEMS.filter((item) =>
  ["How does credit work?", "What documents are required for credit?", "How is KYC handled?"].includes(item.question),
);

export default function CreditPage() {
  return (
    <>
      <PageHero
        eyebrow="Business credit"
        breadcrumb={{ name: "Credit", path: "/credit" }}
        title="Working capital that moves with your procurement."
        description="PolyStoreX's managed credit helps eligible businesses buy the materials they need on structured payment terms - reviewed by people, not decided by a form."
      >
        <TrackedLink href="/request-credit" event="request_credit_click" eventProps={{ location: "credit_hero" }} size="lg" arrow>
          Request Credit
        </TrackedLink>
        <TrackedLink href="/request-credit/track" event="request_credit_click" eventProps={{ location: "credit_hero_track" }} variant="outline-light" size="lg">
          Track an application
        </TrackedLink>
      </PageHero>

      <CreditSection />

      <section aria-labelledby="credit-docs-heading" className="section bg-white">
        <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What you'll need"
              title={<span id="credit-docs-heading">Documents for your application.</span>}
              description="Files are uploaded directly to PolyStoreX's secure document storage and are visible only to you and the PolyStoreX credit team."
            />
            <ul className="mt-10 divide-y divide-line rounded-2xl border border-line">
              {DOCUMENTS.map((doc) => (
                <li key={doc.title} className="flex items-center gap-4 px-5 py-4">
                  <doc.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                  <span className="flex-1 font-medium text-brand-800">{doc.title}</span>
                  <span
                    className={
                      doc.required
                        ? "rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand"
                        : "rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink-subtle"
                    }
                  >
                    {doc.required ? "Required" : "Recommended"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-sm text-ink-subtle">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              PDF, JPG, PNG or WEBP up to 10 MB each. GST and PAN are verified from your PolyStoreX
              business profile.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="After you apply" title="How your application is reviewed." />
            <ol className="relative mt-10 space-y-8 border-l border-line pl-8">
              {STAGES.map((stage, index) => (
                <li key={stage.status} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties} className="relative">
                  <span className="absolute -left-[2.6rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-white" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <h3 className="text-lg font-semibold">{stage.status}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-muted">{stage.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FaqSection items={CREDIT_FAQ} title="Credit questions." />
    </>
  );
}
