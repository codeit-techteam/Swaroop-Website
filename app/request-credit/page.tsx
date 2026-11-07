import type { Metadata } from "next";
import { FileCheck2, Lock, ShieldCheck, Smartphone, Timer } from "lucide-react";
import { CreditApplicationFlow } from "@/components/credit/credit-application-flow";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request Business Credit",
  description:
    "Apply for PolyStoreX business credit for industrial material procurement. Verify your mobile with OTP, then share your requirement and upload documents securely.",
  path: "/request-credit",
});

const CHECKLIST = [
  "GST Registration Certificate",
  "Bank statement (last 6 months)",
  "ITR or financial statements",
];

const ASSURANCES = [
  {
    icon: Smartphone,
    text: "Verify with your Indian mobile number and a one-time OTP — no password on this page.",
  },
  {
    icon: Lock,
    text: "Existing buyers are linked to their account. New numbers create a buyer profile after OTP.",
  },
  {
    icon: ShieldCheck,
    text: "GST and PAN checks run on PolyStoreX's servers. Only masked values are shown.",
  },
  {
    icon: FileCheck2,
    text: "Documents upload to secure storage and are seen only by the credit team.",
  },
  {
    icon: Timer,
    text: "If you already applied, we'll show your Application ID so you can track status.",
  },
];

export default function RequestCreditPage() {
  return (
    <>
      <PageHero
        eyebrow="Request credit"
        breadcrumb={{ name: "Request Credit", path: "/request-credit" }}
        title="Apply for business credit."
        description="Verify your mobile with OTP. Existing applications surface your Application ID; new applicants continue to the form. Every request is reviewed by the PolyStoreX credit team."
      />
      <section id="credit-flow" className="section scroll-mt-20 bg-paper">
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.85fr)] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <CreditApplicationFlow />
          </div>
          <aside className="order-first space-y-4 lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="card-material relative overflow-hidden p-5 sm:p-6">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-accent-500 to-accent"
              />
              <h2 className="text-lg font-semibold text-brand-800">Keep these ready</h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-muted">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <FileCheck2
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-subtle">
                GST returns, a cancelled cheque and business registration help speed up review.
              </p>
            </div>
            <ul className="card-material relative space-y-4 overflow-hidden p-5 text-sm text-ink-muted sm:p-6">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 scale-x-100 bg-gradient-to-r from-brand/40 via-accent-500/50 to-accent/40"
              />
              {ASSURANCES.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand ring-1 ring-brand-100">
                    <item.icon aria-hidden="true" className="h-4 w-4" />
                  </span>
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
