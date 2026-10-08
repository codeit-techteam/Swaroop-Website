import { CircleCheck } from "lucide-react";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { platformLinks } from "@/lib/env";
import type { CreditApplicationStatus } from "@/lib/services/credit";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge, SummaryList } from "../flow-ui";

const NEXT_STEPS = [
  "Our credit team reviews your business profile and documents.",
  "If anything is missing, we'll ask you to upload it — you'll see this on the tracking page.",
  "Once a decision is made, your approved limit and terms appear in your Swaroop account.",
];

export function SuccessPanel({
  applicationId,
  applicationNumber,
  submittedAt,
  status,
}: {
  applicationId: string;
  applicationNumber: string;
  submittedAt: string | null;
  status: CreditApplicationStatus;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CircleCheck aria-hidden="true" className="h-8 w-8" />
      </span>
      <h2 tabIndex={-1} id="credit-success-heading" className="mt-6 text-display-md font-semibold outline-none">
        Credit request submitted successfully.
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-ink-muted">
        Keep your reference number handy. Approval isn't automatic — our team reviews every request.
      </p>
      <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-line p-5 text-left sm:p-6">
        <SummaryList
          items={[
            { label: "Reference number", value: <span className="font-semibold text-brand-800">{applicationNumber}</span> },
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
    </div>
  );
}
