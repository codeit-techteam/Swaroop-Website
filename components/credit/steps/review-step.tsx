"use client";

import { useState } from "react";
import { LoaderCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAYMENT_TERMS } from "@/content/credit-form";
import type { CreditApplication } from "@/lib/services/credit";
import type { KycOverview } from "@/lib/services/kyc";
import { formatInr } from "@/lib/utils";
import { normalizeMobile, parseAmount } from "@/lib/validation";
import { Alert, SummaryList } from "../flow-ui";
import type { FlowDraft } from "../flow-model";
import { VerificationSummary } from "./verification-step";

function ReviewCard({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            <Pencil aria-hidden="true" className="h-3.5 w-3.5" /> Edit
            <span className="sr-only"> {title.toLowerCase()}</span>
          </button>
        ) : null}
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export function ReviewStep({
  draft,
  kyc,
  application,
  onEdit,
  onSubmit,
  submitting,
  error,
}: {
  draft: FlowDraft;
  kyc: KycOverview;
  application: CreditApplication;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}) {
  const [accurate, setAccurate] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const [showError, setShowError] = useState(false);
  const { applicant, requirement } = draft;
  const terms = PAYMENT_TERMS.find((term) => String(term.days) === requirement.tenureDays)?.label;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accurate || !understood) {
      setShowError(true);
      return;
    }
    onSubmit();
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      <ReviewCard title="Business details" onEdit={() => onEdit(1)}>
        <SummaryList
          items={[
            { label: "Business name", value: applicant.companyName },
            { label: "Contact person", value: applicant.contactPerson },
            { label: "Mobile", value: `+91 ${normalizeMobile(applicant.mobile)}` },
            { label: "Email", value: applicant.email },
            { label: "Business type", value: applicant.businessType },
            { label: "Location", value: `${applicant.city}, ${applicant.state}` },
          ]}
        />
      </ReviewCard>
      <ReviewCard title="Verification status">
        <VerificationSummary kyc={kyc} />
      </ReviewCard>
      <ReviewCard title="Requested credit" onEdit={() => onEdit(3)}>
        <SummaryList
          items={[
            { label: "Requested amount", value: formatInr(parseAmount(requirement.requestedAmount) ?? 0) },
            { label: "Monthly procurement", value: formatInr(parseAmount(requirement.monthlyProcurement) ?? 0) },
            { label: "Preferred terms", value: terms },
            { label: "Time in business", value: requirement.businessDuration },
            {
              label: "Existing credit facility",
              value: requirement.existingFacility === "yes" ? `Yes - ${requirement.existingFacilityDetails}` : "No",
            },
          ]}
        />
      </ReviewCard>
      <ReviewCard title="Documents" onEdit={() => onEdit(4)}>
        <ul className="divide-y divide-line">
          {application.documents.map((doc) => (
            <li key={doc.id} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-ink-subtle">{doc.label}</span>
              <span className="break-all text-[0.95rem] font-medium">{doc.fileName}</span>
            </li>
          ))}
        </ul>
      </ReviewCard>

      <fieldset className="rounded-2xl bg-paper p-5 sm:p-6">
        <legend className="sr-only">Declarations</legend>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={accurate}
              onChange={(event) => setAccurate(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-accent"
            />
            <span>
              I confirm the information and documents provided are accurate and that I am authorised to
              apply on behalf of this business. I authorise PolyStoreX to verify them.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={understood}
              onChange={(event) => setUnderstood(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-accent"
            />
            <span>
              I understand that submitting this request does not guarantee approval, and that any credit
              limit and terms are decided by PolyStoreX after review.
            </span>
          </label>
        </div>
        {showError && (!accurate || !understood) ? (
          <p role="alert" className="field-error mt-4">Please accept both declarations to submit.</p>
        ) : null}
      </fieldset>

      {error ? <Alert tone="error">{error}</Alert> : null}

      <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" size="lg" onClick={() => onEdit(4)} disabled={submitting}>
          Back
        </Button>
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
          {submitting ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
          {submitting ? "Submitting…" : "Submit Credit Request"}
        </Button>
      </div>
    </form>
  );
}
