"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { ApiError, errorMessage } from "@/lib/api-client";
import {
  canEditDocuments,
  displayStatusOf,
  fetchApplication,
  fetchLatestApplication,
  fetchMyApplications,
  resubmitDocuments,
  type CreditApplication,
  type CreditApplicationSummary,
} from "@/lib/services/credit";
import { cn, formatDate, formatDateTime, formatInr } from "@/lib/utils";
import { DocumentsManager } from "./documents-manager";
import { Alert, LoadingPanel, StatusBadge, SummaryList } from "./flow-ui";
import { SignInPanel } from "./sign-in-panel";
import { hasCustomerRole, useWebsiteSession } from "./use-website-session";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function TrackApplication() {
  const { state, retry, signedIn } = useWebsiteSession();
  if (state.status === "loading") return <LoadingPanel label="Checking your account…" />;
  if (state.status === "error") {
    return (
      <Alert tone="error" action={<Button size="sm" variant="ghost" onClick={retry}>Try again</Button>}>
        {state.message}
      </Alert>
    );
  }
  if (state.status === "anonymous") {
    return (
      <SignInPanel expired={state.expired} onSignedIn={signedIn} title="Sign in to track your application" />
    );
  }
  if (!hasCustomerRole(state.user)) {
    return (
      <Alert tone="warning" title="No buyer account found">
        Credit applications belong to PolyStoreX buyer accounts. Sign in with your buyer account to track one.
      </Alert>
    );
  }
  return <Tracker key={state.user.id} />;
}

type Load =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "ready"; application: CreditApplication };

function Tracker() {
  const params = useSearchParams();
  const requestedId = params.get("id");
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [docsBlocking, setDocsBlocking] = useState(false);
  const [note, setNote] = useState("");
  const [resubmitting, setResubmitting] = useState(false);
  const [resubmitError, setResubmitError] = useState("");
  const [resubmitted, setResubmitted] = useState(false);
  const [mine, setMine] = useState<CreditApplicationSummary[]>([]);

  const fetchCurrent = useCallback(async (quiet = false) => {
    if (!quiet) setLoad({ status: "loading" });
    try {
      const application =
        requestedId && UUID.test(requestedId) ? await fetchApplication(requestedId) : await fetchLatestApplication();
      setLoad(application ? { status: "ready", application } : { status: "empty" });
    } catch (error) {
      if (error instanceof ApiError && error.isUnauthorized) return;
      if (error instanceof ApiError && (error.status === 404 || error.isForbidden)) {
        setLoad({ status: "empty" });
        return;
      }
      setLoad({ status: "error", message: errorMessage(error, "We couldn't load your application.") });
    }
  }, [requestedId]);

  useEffect(() => {
    void fetchCurrent();
  }, [fetchCurrent]);

  useEffect(() => {
    // Secondary list; the selected application above still renders if this fails.
    fetchMyApplications()
      .then(setMine)
      .catch(() => setMine([]));
  }, []);

  if (load.status === "loading") return <LoadingPanel label="Loading your application…" />;
  if (load.status === "error") {
    return (
      <Alert
        tone="error"
        title="We couldn't load your application"
        action={
          <Button size="sm" variant="ghost" onClick={() => void fetchCurrent()}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
          </Button>
        }
      >
        {load.message}
      </Alert>
    );
  }
  if (load.status === "empty") {
    return (
      <div className="card p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold">No credit application found</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">
          We couldn't find a credit application on this account. You can start one in a few minutes.
        </p>
        <ButtonLink href="/request-credit" size="lg" className="mt-8" arrow>
          Request Credit
        </ButtonLink>
      </div>
    );
  }

  const application = load.application;
  const needsDocuments = application.status === "DOCUMENTS_REQUIRED";
  const editable = canEditDocuments(application.status) && application.status !== "DRAFT";
  const timeline = [...(application.timeline ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  async function resubmit() {
    setResubmitting(true);
    setResubmitError("");
    try {
      await resubmitDocuments(application.id, note.trim() || undefined);
      setResubmitted(true);
      setNote("");
      await fetchCurrent(true);
    } catch (error) {
      setResubmitError(errorMessage(error, "We couldn't resubmit your documents. Please try again."));
    } finally {
      setResubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="card p-6 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-subtle">Application {application.applicationNumber}</p>
          <StatusBadge status={displayStatusOf(application)} />
        </div>
        <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{formatInr(Number(application.requestedLimit))} requested</h2>
        {application.customerMessage ? (
          <Alert tone={needsDocuments ? "warning" : "info"} className="mt-6" title="Message from the credit team">
            {application.customerMessage}
          </Alert>
        ) : null}
        {application.status === "DRAFT" ? (
          application.resubmissionRequested ? (
            <Alert tone="warning" className="mt-6" title="Changes requested" action={<ButtonLink href="/request-credit" size="sm">Update and resubmit</ButtonLink>}>
              Update your application as requested above, then submit it again.
            </Alert>
          ) : (
            <Alert tone="info" className="mt-6" title="Not submitted yet" action={<ButtonLink href="/request-credit" size="sm">Continue application</ButtonLink>}>
              Finish your documents and submit to send this request to the credit team.
            </Alert>
          )
        ) : null}
        <div className="mt-6">
          <SummaryList
            items={[
              { label: "Submitted", value: application.submittedAt ? formatDateTime(application.submittedAt) : "Not yet submitted" },
              { label: "Preferred terms", value: application.requestedTenureDays ? `${application.requestedTenureDays} days` : "-" },
              ...(application.approvedLimit
                ? [{ label: "Approved limit", value: formatInr(Number(application.approvedLimit)) }]
                : []),
              ...(application.decidedAt ? [{ label: "Decision date", value: formatDateTime(application.decidedAt) }] : []),
              { label: "Last updated", value: formatDateTime(application.updatedAt) },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="track-docs" className="card p-6 sm:p-9">
        <h2 id="track-docs" className="text-xl font-semibold">Documents</h2>
        {needsDocuments ? (
          <p className="mt-2 text-sm text-ink-muted">Replace the flagged documents, then send them back for review.</p>
        ) : null}
        <div className="mt-5">
          <DocumentsManager
            application={application}
            editable={editable}
            onChanged={() => fetchCurrent(true)}
            onBlockingChange={setDocsBlocking}
          />
        </div>
        {needsDocuments ? (
          <div className="mt-6 space-y-4 border-t border-line pt-6">
            <div>
              <label htmlFor="resubmit-note" className="label">
                Note for the credit team (optional)
              </label>
              <textarea
                id="resubmit-note"
                rows={3}
                maxLength={2000}
                className="input resize-y"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
            {resubmitError ? <Alert tone="error">{resubmitError}</Alert> : null}
            <Button size="lg" onClick={() => void resubmit()} disabled={resubmitting || docsBlocking} aria-busy={resubmitting}>
              {resubmitting ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
              Send documents for review
            </Button>
          </div>
        ) : null}
        {resubmitted ? <Alert tone="success" className="mt-4">Documents sent back to the credit team for review.</Alert> : null}
      </section>

      {timeline.length ? (
        <section aria-labelledby="track-timeline" className="card p-6 sm:p-9">
          <h2 id="track-timeline" className="text-xl font-semibold">Timeline</h2>
          <ol className="relative mt-6 space-y-6 border-l border-line pl-6">
            {timeline.map((event) => (
              <li key={event.id} className="relative">
                <span aria-hidden="true" className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-white" />
                <p className="font-medium text-ink">{event.description}</p>
                <p className="mt-0.5 text-sm text-ink-subtle">{formatDateTime(event.createdAt)}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {mine.length > 0 ? (
        <section aria-labelledby="my-applications" className="card p-6 sm:p-9">
          <h2 id="my-applications" className="text-xl font-semibold">My credit applications</h2>
          <ul className="mt-5 divide-y divide-line">
            {mine.map((item) => {
              const current = item.id === application.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/request-credit/track?id=${encodeURIComponent(item.id)}`}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex flex-wrap items-center justify-between gap-3 rounded-xl px-3 py-4 transition-colors hover:bg-mist/60",
                      current && "bg-mist/60",
                    )}
                  >
                    <span>
                      <span className="block font-semibold text-ink">{item.applicationNumber}</span>
                      <span className="block text-sm text-ink-subtle">
                        {formatInr(Number(item.requestedLimit))} ·{" "}
                        {item.submittedAt ? `Submitted ${formatDate(item.submittedAt)}` : "Not submitted"}
                      </span>
                    </span>
                    <StatusBadge status={item.displayStatus} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
