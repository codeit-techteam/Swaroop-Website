import type { Metadata } from "next";
import { FileCheck2, Lock, ShieldCheck, Timer } from "lucide-react";
import { CreditApplicationFlow } from "@/components/credit/credit-application-flow";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request Business Credit",
  description:
    "Apply for PolyStoreX business credit for industrial material procurement. Verify your business, share your requirement and upload documents securely.",
  path: "/request-credit",
});

const CHECKLIST = [
  "GST Registration Certificate",
  "Bank statement (last 6 months)",
  "ITR or financial statements",
];

const ASSURANCES = [
  { icon: Lock, text: "Sign in with your PolyStoreX buyer account - no new passwords." },
  { icon: ShieldCheck, text: "GST and PAN checks run on PolyStoreX's servers. Only masked values are shown." },
  { icon: FileCheck2, text: "Documents upload straight to secure storage and are seen only by the credit team." },
  { icon: Timer, text: "Your progress is saved as a draft on your account." },
];

export default function RequestCreditPage() {
  return (
    <>
      <PageHero
        eyebrow="Request credit"
        breadcrumb={{ name: "Request Credit", path: "/request-credit" }}
        title="Apply for business credit."
        description="Five short steps. Every request is reviewed by the PolyStoreX credit team - approval is never automatic."
      />
      <section id="credit-flow" className="section scroll-mt-20 bg-paper">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div className="min-w-0">
            <CreditApplicationFlow />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Keep these ready</h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-muted">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <FileCheck2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-subtle">GST returns, a cancelled cheque and business registration help speed up review.</p>
            </div>
            <ul className="card space-y-4 p-6 text-sm text-ink-muted">
              {ASSURANCES.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item.text}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
