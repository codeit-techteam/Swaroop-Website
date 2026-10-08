import { apiRequest } from "@/lib/api-client";

export type KycStatus =
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "REJECTED";

export type VerificationStatus =
  | "VERIFYING"
  | "VERIFIED"
  | "FAILED"
  | "MANUAL_REVIEW";

export type KycVerification = {
  id: string;
  type: "PAN" | "GST";
  status: VerificationStatus;
  identifierMasked: string;
  details: {
    legalName?: string | null;
    tradeName?: string | null;
    gstStatus?: string | null;
    constitution?: string | null;
    address?: string | null;
    state?: string | null;
    pincode?: string | null;
    panMasked?: string | null;
    nameOnPan?: string | null;
  };
  failureCode: string | null;
  message: string;
  verifiedAt: string | null;
};

export type KycVerifyResult = KycVerification & {
  mismatch?: boolean;
  warning: string | null;
};

export type KycOverview = {
  status: KycStatus;
  kycVerified: boolean;
  locked: boolean;
  verifications: {
    pan: KycVerification | null;
    gst: KycVerification | null;
    mismatch?: boolean;
  };
  organization: {
    name: string | null;
    legalName: string | null;
    gstin: string | null;
    pan: string | null;
    businessType?: string | null;
    constitutionType?: string | null;
    email?: string | null;
    phone?: string | null;
    verificationStatus: string | null;
  };
};

/** Loads (and on first call provisions) the signed-in customer's KYC profile. */
export function fetchKycOverview() {
  return apiRequest<KycOverview>("/customer/kyc");
}

/** Server-side GSTIN verification — the provider is never called from the browser. */
export function verifyGstin(gstin: string) {
  return apiRequest<KycVerifyResult>("/customer/kyc/gst/verify", {
    method: "POST",
    body: { gstin, source: "CUSTOMER_WEB" },
  });
}

export function verifyPan(input: { pan: string; fullName: string; dob: string }) {
  return apiRequest<KycVerifyResult>("/customer/kyc/pan/verify", {
    method: "POST",
    body: { ...input, source: "CUSTOMER_WEB" },
  });
}

export function maskPan(pan: string | null | undefined): string {
  if (!pan) return "—";
  const value = pan.trim().toUpperCase();
  if (/[*•]/.test(value)) return value;
  if (value.length !== 10) return "••••••••••";
  return `${value.slice(0, 2)}••••••${value.slice(8)}`;
}

export function maskGstin(gstin: string | null | undefined): string {
  if (!gstin) return "—";
  const value = gstin.trim().toUpperCase();
  if (value.length !== 15) return value;
  return `${value.slice(0, 2)}${value.slice(2, 4)}•••••••${value.slice(11)}`;
}
