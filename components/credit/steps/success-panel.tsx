import Link from "next/link";
import { CircleCheck, LifeBuoy } from "lucide-react";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { platformLinks } from "@/lib/env";
import type { CreditApplicationStatus } from "@/lib/services/credit";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge, SummaryList } from "../flow-ui";

const NEXT_STEPS = [
  "Our credit team reviews your business profile and documents.",
  "If anything is missing, we'll ask you to upload it - you'll see this on the tracking page.",
  "Once a decision is made, your approved limit and terms appear in your PolyStoreX account.",
];

const DEFAULT_MESSAGE =
  "Your credit request has been submitted successfully. Our team will review your application and contact you.";

export function SuccessPanel({
  applicationId,
  applicationNumber,
  submittedAt,
  status,
  message = DEFAULT_MESSAGE,
}: {
  applicationId: string;
  applicationNumber: string;
  submittedAt: string | null;
  status: CreditApplicationStatus;
  message?: string;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CircleCheck aria-hidden="true" className="h-8 w-8" />
      </span>
      <h2 tabIndex={-1} id="credit-success-heading" className="mt-6 text-display-md font-semibold outline-none">
        Request Submitted Successfully
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-ink-muted">{message}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-ink-subtle">
        Keep your application number handy. Approval isn't automatic - our team reviews every request.
      </p>
      <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-line p-5 text-left sm:p-6">
        <SummaryList
          items={[
            { label: "Application number", value: <span className="font-semibold text-brand-800">{applicationNumber}</span> },
            { label: "Submitted", value: submittedAt ? formatDateTime(submittedAt) : "Just now" },
            { label: "Current status", value: <StatusBadge status={status} /> },
          ]}
        />
      </div>
      <div className="mx-auto mt-8 max-w-lg text-left">
        <h3 className="text-lg font-semibold">What happens next</h3>
        <ol className="mt-4 space-y-3">
          {NEXT_STEPS.map((step, index) => (
            <li key={step} className="flex gap-3 text-[0.95rem] text-ink-muted">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={`/request-credit/track?id=${encodeURIComponent(applicationId)}`} size="lg" arrow>
          Track Application
        </ButtonLink>
        <ExternalButton href={platformLinks.customerMarketplace} variant="ghost" size="lg">
          Explore materials
        </ExternalButton>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted">
        <LifeBuoy aria-hidden="true" className="h-4 w-4" />
        Questions about your request?{" "}
        <Link href="/contact?topic=CREDIT" className="font-semibold text-brand-800 underline-offset-4 hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
}
