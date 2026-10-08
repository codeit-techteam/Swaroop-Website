import { apiRequest } from "@/lib/api-client";

/** Mirrors `CreditApplicationStatus` in Swaroop-Backend. */
export type CreditApplicationStatus =
  | "DRAFT"
  | "PENDING"
  | "DOCUMENTS_UNDER_REVIEW"
  | "UNDER_REVIEW"
  | "DOCUMENTS_REQUIRED"
  | "INSURANCE_REVIEW"
  | "CREDIT_ARRANGEMENT_PENDING"
  | "APPROVED"
  | "PARTIALLY_APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

/**
 * What to show people: the stored status, or RESUBMISSION_REQUIRED for a
 * draft the credit team reopened for changes.
 */
export type CreditDisplayStatus = CreditApplicationStatus | "RESUBMISSION_REQUIRED";

/** Mirrors `CREDIT_APPLICATION_DOCUMENT_TYPES` in Swaroop-Backend. */
export type CreditDocumentType =
  | "gst_registration"
  | "gst_returns"
  | "bank_statement"
  | "itr_financials"
  | "cancelled_cheque"
  | "business_registration"
  | "other";

export type CreditDocument = {
  id: string;
  documentType: CreditDocumentType | string;
  label: string;
  fileName: string;
  mimeType: string | null;
  fileSizeBytes: string | null;
  status: string;
  rejectionReason: string | null;
  storagePending: boolean;
  createdAt: string;
};

export type CreditTimelineEvent = {
  id: string;
  eventType: string;
  description: string;
  createdAt: string;
};

export type CreditApplication = {
  id: string;
  applicationNumber: string;
  status: CreditApplicationStatus;
  displayStatus?: CreditDisplayStatus;
  resubmissionRequested?: boolean;
  requestedLimit: string;
  requestedTenureDays: number | null;
  purpose: string | null;
  approvedLimit: string | null;
  customerMessage: string | null;
  submittedAt: string | null;
  decidedAt: string | null;
  createdAt: string;
  updatedAt: string;
  nextStep: string;
  canSubmit: boolean;
  requiredDocuments: {
    documentType: CreditDocumentType;
    label: string;
    uploaded: boolean;
    documentId: string | null;
  }[];
  missingDocuments: { documentType: CreditDocumentType; label: string }[];
  documents: CreditDocument[];
  timeline?: CreditTimelineEvent[];
  storage?: { configured: boolean; pending: boolean };
};

export type CreditDraftInput = {
  requestedLimit: number;
  requestedTenureDays?: number;
  purpose?: string;
  metadata?: Record<string, unknown>;
};

export type CreditDocumentCreated = CreditDocument & {
  uploadUrl?: string | null;
  storageConfigured?: boolean;
};

export type CreditApplicationSummary = {
  id: string;
  applicationNumber: string;
  status: CreditApplicationStatus;
  displayStatus: CreditDisplayStatus;
  resubmissionRequested: boolean;
  requestedLimit: string;
  approvedLimit: string | null;
  customerMessage: string | null;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  nextStep: string;
};

export type CreditSubmitResult = {
  id: string;
  applicationNumber: string;
  status: CreditApplicationStatus;
  submittedAt: string | null;
  /** True when this call repeated an earlier successful submit. */
  alreadySubmitted: boolean;
  message: string;
  nextStep: string;
};

/** The signed-in customer's applications, newest first. */
export function fetchMyApplications() {
  return apiRequest<CreditApplicationSummary[]>("/customer/credit/applications");
}

export function fetchLatestApplication() {
  return apiRequest<CreditApplication | null>("/customer/credit/application");
}

export function fetchApplication(id: string) {
  return apiRequest<CreditApplication>(`/customer/credit/applications/${id}`);
}

/** Creates the customer's open DRAFT application or updates the existing draft. */
export function saveDraft(input: CreditDraftInput) {
  return apiRequest<CreditApplication>("/customer/credit/applications", {
    method: "POST",
    body: input,
  });
}

export function createDocument(
  applicationId: string,
  input: {
    documentType: CreditDocumentType;
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
  },
) {
  return apiRequest<CreditDocumentCreated>(
    `/customer/credit/applications/${applicationId}/documents`,
    { method: "POST", body: input },
  );
}

export function replaceDocument(
  applicationId: string,
  documentId: string,
  input: { fileName: string; mimeType: string; fileSizeBytes: number },
) {
  return apiRequest<CreditDocumentCreated>(
    `/customer/credit/applications/${applicationId}/documents/${documentId}/replace`,
    { method: "POST", body: input },
  );
}

/** Idempotent on the backend: retrying after a lost response returns the same application. */
export function submitApplication(id: string) {
  return apiRequest<CreditSubmitResult>(`/customer/credit/applications/${id}/submit`, {
    method: "POST",
  });
}

export function resubmitDocuments(id: string, message?: string) {
  return apiRequest<{ id: string; status: CreditApplicationStatus; nextStep: string }>(
    `/customer/credit/applications/${id}/resubmit-documents`,
    { method: "POST", body: message ? { message } : {} },
  );
}

export const ALLOWED_DOCUMENT_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

/** Backend runtime cap (`MAX_DOCUMENT_SIZE_MB`); the API re-validates. */
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

export function resolveMime(file: File): string | null {
  const type = file.type.toLowerCase();
  if ((ALLOWED_DOCUMENT_MIME as readonly string[]).includes(type)) return type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "application/pdf";
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  return null;
}

export class StorageUploadError extends Error {
  constructor() {
    super("The file could not be stored. Please retry the upload.");
    this.name = "StorageUploadError";
  }
}

/** Streams the file to the backend-issued signed R2 URL. */
export function putToSignedUrl(
  uploadUrl: string,
  file: File,
  mimeType: string,
  onProgress?: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", mimeType);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new StorageUploadError());
    xhr.onerror = () => reject(new StorageUploadError());
    xhr.onabort = () => reject(new StorageUploadError());
    xhr.send(file);
  });
}

const STATUS_LABELS: Record<CreditDisplayStatus, string> = {
  DRAFT: "Draft",
  RESUBMISSION_REQUIRED: "Resubmission required",
  PENDING: "Submitted",
  DOCUMENTS_UNDER_REVIEW: "Documents under review",
  UNDER_REVIEW: "Under review",
  DOCUMENTS_REQUIRED: "Documents required",
  INSURANCE_REVIEW: "Under review",
  CREDIT_ARRANGEMENT_PENDING: "Under review",
  APPROVED: "Approved",
  PARTIALLY_APPROVED: "Approved (partial)",
  REJECTED: "Not approved",
  EXPIRED: "Expired",
  CANCELLED: "Cancelled",
};

export function statusLabel(status: CreditDisplayStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function displayStatusOf(application: {
  status: CreditApplicationStatus;
  displayStatus?: CreditDisplayStatus;
}): CreditDisplayStatus {
  return application.displayStatus ?? application.status;
}

export type StatusTone = "neutral" | "progress" | "attention" | "success" | "danger";

export function statusTone(status: CreditDisplayStatus): StatusTone {
  switch (status) {
    case "APPROVED":
    case "PARTIALLY_APPROVED":
      return "success";
    case "REJECTED":
      return "danger";
    case "DOCUMENTS_REQUIRED":
    case "RESUBMISSION_REQUIRED":
      return "attention";
    case "DRAFT":
    case "EXPIRED":
    case "CANCELLED":
      return "neutral";
    default:
      return "progress";
  }
}

export const OPEN_STATUSES: CreditApplicationStatus[] = [
  "DRAFT",
  "PENDING",
  "DOCUMENTS_UNDER_REVIEW",
  "UNDER_REVIEW",
  "DOCUMENTS_REQUIRED",
  "INSURANCE_REVIEW",
  "CREDIT_ARRANGEMENT_PENDING",
];

export function canEditDocuments(status: CreditApplicationStatus): boolean {
  return status === "DRAFT" || status === "DOCUMENTS_REQUIRED" || status === "PENDING";
}
