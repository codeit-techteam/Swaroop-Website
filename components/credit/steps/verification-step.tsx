"use client";

import { useState } from "react";
import { BadgeCheck, Clock, LoaderCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/api-client";
import { platformLinks } from "@/lib/env";
import { fetchKycOverview, maskPan, verifyGstin, type KycOverview, type VerificationStatus } from "@/lib/services/kyc";
import { isValidGstin } from "@/lib/validation";
import { Alert, FormField, SummaryList, describedBy } from "../flow-ui";

const STATUS_COPY: Record<VerificationStatus, string> = {
  VERIFIED: "Verified",
  MANUAL_REVIEW: "Under manual review",
  VERIFYING: "Verification in progress",
  FAILED: "Not verified",
};

export function isBusinessVerified(kyc: KycOverview): boolean {
  const status = kyc.verifications.gst?.status;
  return status === "VERIFIED" || status === "MANUAL_REVIEW";
}

export function VerificationSummary({ kyc }: { kyc: KycOverview }) {
  const gst = kyc.verifications.gst;
  const pan = kyc.verifications.pan;
  return (
    <SummaryList
      items={[
        { label: "Legal name", value: gst?.details.legalName || kyc.organization.legalName || "-" },
        { label: "GSTIN", value: gst?.identifierMasked || "-" },
        { label: "GST verification", value: gst ? STATUS_COPY[gst.status] : "Not started" },
        { label: "PAN", value: pan?.identifierMasked || gst?.details.panMasked || maskPan(kyc.organization.pan) },
        { label: "PAN verification", value: pan ? STATUS_COPY[pan.status] : "Linked through GSTIN" },
      ]}
    />
  );
}

export function VerificationStep({
  kyc,
  onKycChange,
  onBack,
  onContinue,
}: {
  kyc: KycOverview;
  onKycChange: (kyc: KycOverview) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const gst = kyc.verifications.gst;
  const verified = isBusinessVerified(kyc);
  const [gstin, setGstin] = useState(() => {
    const value = kyc.organization.gstin ?? "";
    return isValidGstin(value) ? value.toUpperCase() : "";
  });
  const [fieldError, setFieldError] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [busy, setBusy] = useState<"verify" | "refresh" | null>(null);

  async function refresh() {
    setBusy("refresh");
    setError("");
    try {
      onKycChange(await fetchKycOverview());
    } catch (err) {
      setError(errorMessage(err, "We couldn't refresh your verification status."));
    } finally {
      setBusy(null);
    }
  }

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = gstin.trim().toUpperCase();
    if (!isValidGstin(value)) {
      setFieldError("Enter a valid 15-character GSTIN.");
      return;
    }
    setFieldError("");
    setError("");
    setWarning("");
    setBusy("verify");
    try {
      const result = await verifyGstin(value);
      if (result.status === "FAILED") setError(result.message || "We couldn't verify this GSTIN.");
      if (result.warning) setWarning(result.warning);
      onKycChange(await fetchKycOverview());
    } catch (err) {
      setError(errorMessage(err, "Verification is unavailable right now. Please try again shortly."));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="flex items-start gap-3 rounded-xl bg-paper p-4 text-sm text-ink-muted">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p>
          Verification runs on Petrotrade's secure servers. We only ever show masked identifiers, and a
          business that's already verified on Petrotrade doesn't need to verify again.
        </p>
      </div>

      {verified ? (
        <div className="mt-6 rounded-2xl border border-line p-5 sm:p-6">
          <p className="flex items-center gap-2 font-semibold text-emerald-700">
            {gst?.status === "VERIFIED" ? (
              <BadgeCheck aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Clock aria-hidden="true" className="h-5 w-5 text-amber-600" />
            )}
            {gst?.status === "VERIFIED" ? "Business verified" : "Verification under manual review - you can continue"}
          </p>
          <div className="mt-3">
            <VerificationSummary kyc={kyc} />
          </div>
        </div>
      ) : gst?.status === "VERIFYING" ? (
        <Alert
          tone="info"
          className="mt-6"
          title="Verification in progress"
          action={
            <Button size="sm" variant="ghost" onClick={() => void refresh()} disabled={busy !== null}>
              {busy === "refresh" ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : <RefreshCw aria-hidden="true" className="h-4 w-4" />}
              Refresh status
            </Button>
          }
        >
          We're confirming your GSTIN. This usually takes a moment.
        </Alert>
      ) : kyc.locked ? (
        <Alert tone="warning" className="mt-6" title="Your business details are with our verification team">
          Your KYC submission is locked while it's reviewed.{" "}
          <a href={platformLinks.customerKyc} rel="noopener" className="font-semibold underline underline-offset-2">
            View KYC status
          </a>
        </Alert>
      ) : (
        <form noValidate onSubmit={verify} className="mt-6 rounded-2xl border border-line p-5 sm:p-6">
          <h3 className="text-lg font-semibold">Verify your GSTIN</h3>
          <p className="mt-1 text-sm text-ink-muted">
            {gst?.status === "FAILED"
              ? "Your last verification attempt didn't succeed. Check the GSTIN and try again."
              : "We confirm your registration with the GST network. Your PAN is linked through your GSTIN."}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start">
            <FormField id="kyc-gstin" label="GSTIN" required error={fieldError} className="flex-1">
              <input
                id="kyc-gstin"
                className="input uppercase tracking-wider"
                value={gstin}
                maxLength={15}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => setGstin(event.target.value.toUpperCase().replace(/[^0-9A-Z]/g, ""))}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={describedBy("kyc-gstin", fieldError)}
              />
            </FormField>
            <Button type="submit" size="lg" className="sm:mt-[1.85rem]" disabled={busy !== null} aria-busy={busy === "verify"}>
              {busy === "verify" ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
              {busy === "verify" ? "Verifying…" : "Verify GSTIN"}
            </Button>
          </div>
        </form>
      )}

      {error ? <Alert tone="error" className="mt-4">{error}</Alert> : null}
      {warning ? <Alert tone="warning" className="mt-4">{warning}</Alert> : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" arrow disabled={!verified} onClick={onContinue}>
          Continue to credit requirement
        </Button>
      </div>
    </div>
  );
}
