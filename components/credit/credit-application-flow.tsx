"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, LogOut, RefreshCw } from "lucide-react";
import { Button, ButtonLink, ExternalButton } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { ApiError, errorMessage } from "@/lib/api-client";
import { platformLinks } from "@/lib/env";
import { displayName, logout, type AuthUser } from "@/lib/services/auth";
import {
  OPEN_STATUSES,
  displayStatusOf,
  fetchApplication,
  fetchLatestApplication,
  saveDraft,
  submitApplication,
  type CreditApplication,
  type CreditApplicationStatus,
} from "@/lib/services/credit";
import { fetchKycOverview, type KycOverview } from "@/lib/services/kyc";
import { cn, formatDate, formatInr } from "@/lib/utils";
import { DocumentsManager } from "./documents-manager";
import { Alert, LoadingPanel, StatusBadge } from "./flow-ui";
import {
  clearStoredDraft,
  initialDraft,
  loadStoredDraft,
  storeDraft,
  toDraftPayload,
  type FlowDraft,
} from "./flow-model";
import { BusinessStep } from "./steps/business-step";
import { RequirementStep } from "./steps/requirement-step";
import { ReviewStep } from "./steps/review-step";
import { SuccessPanel } from "./steps/success-panel";
import { VerificationStep, isBusinessVerified } from "./steps/verification-step";
import { SignInPanel } from "./sign-in-panel";
import { hasCustomerRole, useWebsiteSession } from "./use-website-session";

const STEPS = [
  { title: "Business details", description: "Tell us about your business." },
  { title: "Verification", description: "Confirm your GST registration." },
  { title: "Credit requirement", description: "How much credit, and on what terms?" },
  { title: "Documents", description: "Upload files securely for the credit team." },
  { title: "Review & submit", description: "Check everything before you submit." },
];

export function CreditApplicationFlow() {
  const { state, retry, signedIn } = useWebsiteSession();

  if (state.status === "loading") return <LoadingPanel label="Checking your account…" />;
  if (state.status === "error") {
    return (
      <Alert
        tone="error"
        title="Something went wrong"
        action={
          <Button size="sm" variant="ghost" onClick={retry}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
          </Button>
        }
      >
        {state.message}
      </Alert>
    );
  }
  if (state.status === "anonymous") return <SignInPanel expired={state.expired} onSignedIn={signedIn} />;
  if (!hasCustomerRole(state.user)) return <NotCustomer user={state.user} />;
  return <CreditWizard key={state.user.id} user={state.user} />;
}

function AccountBar({ user }: { user: AuthUser }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-muted">
      <p>
        Signed in as <span className="font-semibold text-ink">{displayName(user)}</span>
      </p>
      <button
        type="button"
        onClick={() => void logout()}
        className="inline-flex items-center gap-1.5 font-semibold text-ink-muted hover:text-brand-800"
      >
        <LogOut aria-hidden="true" className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}

function NotCustomer({ user }: { user: AuthUser }) {
  return (
    <div className="mx-auto max-w-xl">
      <AccountBar user={user} />
      <Alert tone="warning" title="This account isn't set up as a buyer">
        Business credit is available to Petrotrade buyer accounts. Register a buyer account, or sign in with
        the mobile number you use to buy on Petrotrade.
        <div className="mt-4 flex flex-wrap gap-3">
          <ExternalButton href={platformLinks.customerRegister} size="sm">
            Create a buyer account
          </ExternalButton>
          <Button size="sm" variant="ghost" onClick={() => void logout()}>
            Use a different account
          </Button>
        </div>
      </Alert>
    </div>
  );
}

type Bootstrap =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "forbidden" }
  | { status: "ready"; kyc: KycOverview; latest: CreditApplication | null };

type Submitted = {
  id: string;
  applicationNumber: string;
  submittedAt: string | null;
  status: CreditApplicationStatus;
  message: string;
};

const SUBMIT_FAILED = "Unable to submit your credit request right now. Please try again.";

/** Validation messages are shown as-is; outages get a generic message plus a support reference. */
function submitErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status >= 500 || error.isNetwork) {
      return error.requestId ? `${SUBMIT_FAILED} (Reference: ${error.requestId})` : SUBMIT_FAILED;
    }
    return error.message;
  }
  return SUBMIT_FAILED;
}

function CreditWizard({ user }: { user: AuthUser }) {
  const [boot, setBoot] = useState<Bootstrap>({ status: "loading" });

  const load = useCallback(async () => {
    setBoot({ status: "loading" });
    try {
      const [kyc, latest] = await Promise.all([fetchKycOverview(), fetchLatestApplication()]);
      setBoot({ status: "ready", kyc, latest });
    } catch (error) {
      if (error instanceof ApiError && error.isUnauthorized) return;
      if (error instanceof ApiError && error.isForbidden) {
        setBoot({ status: "forbidden" });
        return;
      }
      setBoot({ status: "error", message: errorMessage(error, "We couldn't load your credit details.") });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (boot.status === "loading") return <LoadingPanel label="Loading your business profile…" />;
  if (boot.status === "forbidden") return <NotCustomer user={user} />;
  if (boot.status === "error") {
    return (
      <Alert
        tone="error"
        title="We couldn't load your details"
        action={
          <Button size="sm" variant="ghost" onClick={() => void load()}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
          </Button>
        }
      >
        {boot.message}
      </Alert>
    );
  }

  const latest = boot.latest;
  if (latest && latest.status !== "DRAFT" && OPEN_STATUSES.includes(latest.status)) {
    return (
      <>
        <AccountBar user={user} />
        <ExistingApplication application={latest} />
      </>
    );
  }
  if (latest && (latest.status === "APPROVED" || latest.status === "PARTIALLY_APPROVED")) {
    return (
      <>
        <AccountBar user={user} />
        <ExistingApplication application={latest} approved />
      </>
    );
  }

  return (
    <>
      <AccountBar user={user} />
      <Wizard
        user={user}
        initialKyc={boot.kyc}
        draftApplication={latest?.status === "DRAFT" ? latest : null}
        onConflict={() => void load()}
      />
    </>
  );
}

function ExistingApplication({ application, approved = false }: { application: CreditApplication; approved?: boolean }) {
  return (
    <div className="card p-6 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-subtle">Application {application.applicationNumber}</p>
        <StatusBadge status={displayStatusOf(application)} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold">
        {approved ? "Your business credit is active." : "You already have a credit request in progress."}
      </h2>
      <p className="mt-3 max-w-xl text-ink-muted">
        {approved
          ? `An approved limit of ${formatInr(Number(application.approvedLimit ?? 0))} is available in your Petrotrade account. To request a revised limit, contact the credit team.`
          : `Requested ${formatInr(Number(application.requestedLimit))}${
              application.submittedAt ? ` on ${formatDate(application.submittedAt)}` : ""
            }. You can follow its progress and respond to document requests from the tracking page.`}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {approved ? (
          <>
            <ExternalButton href={platformLinks.customerCredit} size="lg" arrow>
              Open my credit account
            </ExternalButton>
            <ButtonLink href="/contact?topic=CREDIT" variant="ghost" size="lg">
              Contact the credit team
            </ButtonLink>
          </>
        ) : (
          <ButtonLink href={`/request-credit/track?id=${encodeURIComponent(application.id)}`} size="lg" arrow>
            Track Application
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

function Stepper({ current, maxReached, onSelect }: { current: number; maxReached: number; onSelect: (step: number) => void }) {
  return (
    <nav aria-label="Application progress" className="mb-8">
      <ol className="grid grid-cols-5 gap-2">
        {STEPS.map((step, index) => {
          const number = index + 1;
          const done = number < current;
          const active = number === current;
          const reachable = number <= maxReached && !active;
          return (
            <li key={step.title}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onSelect(number)}
                aria-current={active ? "step" : undefined}
                className="group flex w-full flex-col items-start gap-2 text-left disabled:cursor-default"
              >
                <span
                  className={cn(
                    "h-1.5 w-full rounded-full transition-colors",
                    done || active ? "bg-accent" : "bg-mist",
                  )}
                />
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem]",
                      done ? "bg-accent text-white" : active ? "bg-brand text-white" : "bg-mist text-ink-subtle",
                    )}
                  >
                    {done ? <Check aria-hidden="true" className="h-3 w-3" /> : number}
                  </span>
                  <span className={cn("sr-only md:not-sr-only", active ? "text-brand-800" : "text-ink-subtle", reachable && "group-hover:text-brand-800")}>
                    {step.title}
                  </span>
                  <span className="sr-only">{done ? " (completed)" : active ? " (current)" : ""}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Wizard({
  user,
  initialKyc,
  draftApplication,
  onConflict,
}: {
  user: AuthUser;
  initialKyc: KycOverview;
  draftApplication: CreditApplication | null;
  onConflict: () => void;
}) {
  const [kyc, setKyc] = useState(initialKyc);
  const [application, setApplication] = useState<CreditApplication | null>(draftApplication);
  const [draft, setDraft] = useState<FlowDraft>(() =>
    initialDraft(user, initialKyc, draftApplication, loadStoredDraft(user.id)),
  );
  const [step, setStep] = useState(1);
  const [maxReached, setMaxReached] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [docsBlocking, setDocsBlocking] = useState(false);
  const [docsError, setDocsError] = useState("");
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const submitInFlight = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!draftApplication) trackEvent("credit_application_started");
  }, [draftApplication]);

  useEffect(() => {
    storeDraft(user.id, draft);
  }, [user.id, draft]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const target = submitted ? document.getElementById("credit-success-heading") : headingRef.current;
    target?.focus({ preventScroll: true });
    document.getElementById("credit-flow")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [step, submitted]);

  const goTo = (next: number) => {
    setStep(next);
    setMaxReached((prev) => Math.max(prev, next));
  };

  const refreshApplication = useCallback(async () => {
    if (!application) return;
    try {
      setApplication(await fetchApplication(application.id));
      setDocsError("");
    } catch (error) {
      setDocsError(errorMessage(error, "We couldn't refresh your documents."));
    }
  }, [application]);

  async function saveRequirement() {
    setSaving(true);
    setSaveError("");
    try {
      const saved = await saveDraft(toDraftPayload(draft));
      setApplication(saved);
      goTo(4);
    } catch (error) {
      if (error instanceof ApiError && error.status === 400 && /already exists/i.test(error.message)) {
        onConflict();
        return;
      }
      setSaveError(errorMessage(error, "We couldn't save your request. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  async function submit() {
    // Guards against double clicks between the click and the disabled re-render.
    if (!application || submitInFlight.current) return;
    submitInFlight.current = true;
    setSubmitting(true);
    setSubmitError("");
    try {
      await saveDraft(toDraftPayload(draft, new Date().toISOString()));
      const result = await submitApplication(application.id);
      clearStoredDraft(user.id);
      if (!result.alreadySubmitted) trackEvent("credit_application_submitted");
      setSubmitted({
        id: result.id,
        applicationNumber: result.applicationNumber,
        submittedAt: result.submittedAt,
        status: result.status,
        message: result.message,
      });
    } catch (error) {
      setSubmitError(submitErrorMessage(error));
      void refreshApplication();
    } finally {
      submitInFlight.current = false;
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card p-6 sm:p-10">
        <SuccessPanel
          applicationId={submitted.id}
          applicationNumber={submitted.applicationNumber}
          submittedAt={submitted.submittedAt}
          status={submitted.status}
          message={submitted.message}
        />
      </div>
    );
  }

  const current = STEPS[step - 1];
  const docsReady = Boolean(application && application.missingDocuments.length === 0 && !docsBlocking);

  return (
    <div className="card p-5 sm:p-9">
      <Stepper current={step} maxReached={maxReached} onSelect={setStep} />
      <p className="text-sm font-semibold text-accent-600">
        Step {step} of {STEPS.length}
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-semibold outline-none sm:text-3xl">
        {current.title}
      </h2>
      <p className="mt-2 text-ink-muted">{current.description}</p>
      {application && step < 5 ? (
        <p className="mt-2 text-xs text-ink-subtle">Draft {application.applicationNumber} · saved to your account</p>
      ) : null}
      {application?.resubmissionRequested ? (
        <Alert tone="warning" className="mt-5" title="The credit team asked for changes">
          {application.customerMessage ??
            "Review your application, update anything that changed, and submit it again."}
        </Alert>
      ) : null}

      <div className="mt-8">
        {step === 1 ? (
          <BusinessStep
            value={draft.applicant}
            onChange={(applicant) => setDraft((prev) => ({ ...prev, applicant }))}
            onContinue={() => goTo(2)}
          />
        ) : null}
        {step === 2 ? (
          <VerificationStep
            kyc={kyc}
            onKycChange={(next) => {
              setKyc(next);
              const legalName = next.verifications.gst?.details.legalName;
              if (legalName && !draft.applicant.companyName) {
                setDraft((prev) => ({ ...prev, applicant: { ...prev.applicant, companyName: legalName } }));
              }
            }}
            onBack={() => setStep(1)}
            onContinue={() => goTo(3)}
          />
        ) : null}
        {step === 3 ? (
          <RequirementStep
            value={draft.requirement}
            onChange={(requirement) => setDraft((prev) => ({ ...prev, requirement }))}
            onBack={() => setStep(2)}
            onContinue={() => void saveRequirement()}
            saving={saving}
            error={saveError}
          />
        ) : null}
        {step === 4 && application ? (
          <div>
            <DocumentsManager
              application={application}
              onChanged={refreshApplication}
              onBlockingChange={setDocsBlocking}
            />
            <p className="mt-4 text-sm text-ink-subtle">
              PDF, JPG, PNG or WebP, up to 10 MB each. Files go directly to Petrotrade's secure storage.
            </p>
            {docsError ? <Alert tone="error" className="mt-4">{docsError}</Alert> : null}
            {!docsReady && application.missingDocuments.length > 0 ? (
              <p className="mt-4 text-sm text-ink-muted">
                Still needed: {application.missingDocuments.map((doc) => doc.label).join(", ")}.
              </p>
            ) : null}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button variant="ghost" size="lg" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button size="lg" arrow disabled={!docsReady} onClick={() => goTo(5)}>
                Review application
              </Button>
            </div>
          </div>
        ) : null}
        {step === 5 && application ? (
          <ReviewStep
            draft={draft}
            kyc={kyc}
            application={application}
            onEdit={setStep}
            onSubmit={() => void submit()}
            submitting={submitting}
            error={submitError}
          />
        ) : null}
        {step >= 4 && !application ? (
          <Alert tone="warning" action={<Button size="sm" variant="ghost" onClick={() => setStep(3)}>Go to credit requirement</Button>}>
            Save your credit requirement first.
          </Alert>
        ) : null}
        {step >= 3 && !isBusinessVerified(kyc) ? (
          <Alert tone="warning" className="mt-4" action={<Button size="sm" variant="ghost" onClick={() => setStep(2)}>Verify business</Button>}>
            Your business verification is incomplete.
          </Alert>
        ) : null}
      </div>
    </div>
  );
}
