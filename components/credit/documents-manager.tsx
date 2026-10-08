"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleCheck, FileText, LoaderCircle, RefreshCw, TriangleAlert, Upload } from "lucide-react";
import { errorMessage } from "@/lib/api-client";
import {
  ALLOWED_DOCUMENT_MIME,
  MAX_DOCUMENT_BYTES,
  createDocument,
  putToSignedUrl,
  replaceDocument,
  resolveMime,
  type CreditApplication,
  type CreditDocument,
  type CreditDocumentType,
} from "@/lib/services/credit";
import { cn, formatBytes } from "@/lib/utils";

const OPTIONAL_DOCUMENTS: { documentType: CreditDocumentType; label: string; hint: string }[] = [
  { documentType: "gst_returns", label: "GST Returns", hint: "Recent GSTR-3B filings" },
  { documentType: "cancelled_cheque", label: "Cancelled Cheque", hint: "For the account you'll repay from" },
  { documentType: "business_registration", label: "Business Registration", hint: "Incorporation or partnership deed" },
];

const REQUIRED_HINTS: Partial<Record<CreditDocumentType, string>> = {
  gst_registration: "GST REG-06 certificate",
  bank_statement: "Last 6 months, current account",
  itr_financials: "Latest ITR or audited financials",
};

type UploadState =
  | { phase: "uploading"; progress: number }
  | { phase: "failed"; message: string }
  | { phase: "stored" }
  | { phase: "pending-storage" };

const ACCEPT = [...ALLOWED_DOCUMENT_MIME, ".pdf", ".jpg", ".jpeg", ".png", ".webp"].join(",");

function latestDocument(application: CreditApplication, documentType: string): CreditDocument | undefined {
  return application.documents.find((doc) => doc.documentType === documentType);
}

export function DocumentsManager({
  application,
  onChanged,
  onBlockingChange,
  editable = true,
}: {
  application: CreditApplication;
  onChanged: () => Promise<unknown>;
  onBlockingChange?: (blocking: boolean) => void;
  editable?: boolean;
}) {
  const [uploads, setUploads] = useState<Record<string, UploadState>>({});

  const blocking = useMemo(
    () => Object.values(uploads).some((state) => state.phase === "uploading" || state.phase === "failed"),
    [uploads],
  );

  useEffect(() => onBlockingChange?.(blocking), [blocking, onBlockingChange]);

  const rows = [
    ...application.requiredDocuments.map((item) => ({
      documentType: item.documentType,
      label: item.label,
      hint: REQUIRED_HINTS[item.documentType] ?? "",
      required: true,
    })),
    ...OPTIONAL_DOCUMENTS.map((item) => ({ ...item, required: false })),
  ];

  async function upload(documentType: CreditDocumentType, file: File) {
    const setState = (state: UploadState) => setUploads((prev) => ({ ...prev, [documentType]: state }));
    const mimeType = resolveMime(file);
    if (!mimeType) {
      setState({ phase: "failed", message: "Upload a PDF, JPG, PNG or WebP file." });
      return;
    }
    if (file.size <= 0 || file.size > MAX_DOCUMENT_BYTES) {
      setState({ phase: "failed", message: `Files must be smaller than ${formatBytes(MAX_DOCUMENT_BYTES)}.` });
      return;
    }

    setState({ phase: "uploading", progress: 0 });
    const meta = { fileName: file.name.slice(0, 255), mimeType, fileSizeBytes: file.size };
    try {
      const existing = latestDocument(application, documentType);
      const record = existing
        ? await replaceDocument(application.id, existing.id, meta)
        : await createDocument(application.id, { documentType, ...meta });

      if (record.uploadUrl) {
        await putToSignedUrl(record.uploadUrl, file, mimeType, (progress) =>
          setState({ phase: "uploading", progress }),
        );
        setState({ phase: "stored" });
      } else if (application.storage && !application.storage.configured) {
        setState({ phase: "pending-storage" });
      } else {
        throw new Error("The file could not be stored. Please retry the upload.");
      }
    } catch (error) {
      setState({ phase: "failed", message: errorMessage(error, "The upload failed. Please retry.") });
    } finally {
      await onChanged().catch(() => undefined);
    }
  }

  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const doc = latestDocument(application, row.documentType);
        const state = uploads[row.documentType];
        const rejected = doc?.status === "REJECTED";
        const inputId = `doc-${row.documentType}`;
        const uploading = state?.phase === "uploading";

        return (
          <li
            key={row.documentType}
            className={cn(
              "rounded-2xl border bg-white p-4 sm:p-5",
              state?.phase === "failed" || rejected ? "border-red-200" : "border-line",
            )}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  doc && !rejected && state?.phase !== "failed" ? "bg-emerald-50 text-emerald-600" : "bg-brand-50 text-brand",
                )}
              >
                {doc && !rejected && state?.phase !== "failed" ? (
                  <CircleCheck aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <FileText aria-hidden="true" className="h-5 w-5" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">
                  {row.label}{" "}
                  <span className={cn("ml-1 text-xs font-medium", row.required ? "text-accent-600" : "text-ink-subtle")}>
                    {row.required ? "Required" : "Recommended"}
                  </span>
                </p>
                <p className="mt-0.5 truncate text-sm text-ink-muted">
                  {doc ? `${doc.fileName}${doc.fileSizeBytes ? ` · ${formatBytes(Number(doc.fileSizeBytes))}` : ""}` : row.hint}
                </p>
              </div>
              {editable ? (
                <div className="shrink-0">
                  <input
                    id={inputId}
                    type="file"
                    accept={ACCEPT}
                    className="peer sr-only"
                    disabled={uploading}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      if (file) void upload(row.documentType, file);
                    }}
                  />
                  <label
                    htmlFor={inputId}
                    aria-label={`${doc ? "Replace" : "Upload"} ${row.label}`}
                    className={cn(
                      "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2",
                      uploading
                        ? "pointer-events-none border-line text-ink-subtle"
                        : doc && !rejected
                          ? "border-line bg-white text-brand-800 hover:bg-paper"
                          : "border-accent bg-accent text-white hover:bg-accent-600",
                    )}
                  >
                    {uploading ? (
                      <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
                    ) : state?.phase === "failed" ? (
                      <RefreshCw aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Upload aria-hidden="true" className="h-4 w-4" />
                    )}
                    {uploading ? "Uploading" : state?.phase === "failed" ? "Retry" : doc ? "Replace" : "Upload"}
                  </label>
                </div>
              ) : null}
            </div>

            {uploading ? (
              <div className="mt-4" aria-live="polite">
                <div
                  role="progressbar"
                  aria-label={`Uploading ${row.label}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={state.progress}
                  className="h-1.5 overflow-hidden rounded-full bg-mist"
                >
                  <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${state.progress}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-ink-subtle">{state.progress}% uploaded</p>
              </div>
            ) : null}
            {state?.phase === "failed" ? (
              <p role="alert" className="mt-3 flex items-start gap-2 text-sm text-red-700">
                <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> {state.message}
              </p>
            ) : null}
            {state?.phase === "pending-storage" ? (
              <p className="mt-3 text-sm text-amber-800">
                Recorded. Secure file storage is temporarily unavailable, so our team may ask you to share this file again.
              </p>
            ) : null}
            {rejected && state?.phase !== "stored" ? (
              <p className="mt-3 text-sm text-red-700">
                Needs replacement{doc?.rejectionReason ? `: ${doc.rejectionReason}` : "."}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
