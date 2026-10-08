import { INDIAN_STATES, MAX_REQUESTED_CREDIT, MIN_REQUESTED_CREDIT } from "@/content/credit-form";
import type { AuthUser } from "@/lib/services/auth";
import type { CreditApplication, CreditDraftInput } from "@/lib/services/credit";
import type { KycOverview } from "@/lib/services/kyc";
import { formatInr } from "@/lib/utils";
import {
  EMAIL_PATTERN,
  INDIAN_MOBILE_PATTERN,
  normalizeMobile,
  parseAmount,
  type FieldErrors,
} from "@/lib/validation";

export type ApplicantDetails = {
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  businessType: string;
  city: string;
  state: string;
};

export type RequirementDetails = {
  requestedAmount: string;
  monthlyProcurement: string;
  tenureDays: string;
  businessDuration: string;
  existingFacility: "" | "yes" | "no";
  existingFacilityDetails: string;
};

export type FlowDraft = { applicant: ApplicantDetails; requirement: RequirementDetails };

const STORAGE_PREFIX = "swaroop-credit-form:";

/** Form text only (never documents or identifiers) so a reload doesn't lose typing. */
export function loadStoredDraft(userId: string): Partial<FlowDraft> | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + userId);
    return raw ? (JSON.parse(raw) as Partial<FlowDraft>) : null;
  } catch {
    return null;
  }
}

export function storeDraft(userId: string, draft: FlowDraft) {
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(draft));
  } catch {
    /* storage unavailable */
  }
}

export function clearStoredDraft(userId: string) {
  try {
    window.sessionStorage.removeItem(STORAGE_PREFIX + userId);
  } catch {
    /* storage unavailable */
  }
}

function matchState(raw: string | null | undefined): string {
  const value = raw?.trim().toLowerCase();
  if (!value) return "";
  return INDIAN_STATES.find((state) => state.toLowerCase() === value) ?? "";
}

function amountInput(value: string | null | undefined): string {
  const amount = value ? Math.round(Number(value)) : 0;
  return amount > 0 ? amount.toLocaleString("en-IN") : "";
}

export function initialDraft(
  user: AuthUser,
  kyc: KycOverview,
  application: CreditApplication | null,
  stored: Partial<FlowDraft> | null,
): FlowDraft {
  const org = kyc.organization;
  const userName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const applicant: ApplicantDetails = {
    companyName: org.legalName || org.name || "",
    contactPerson: userName,
    mobile: user.phone ? normalizeMobile(user.phone) : org.phone ? normalizeMobile(org.phone) : "",
    email: user.email || org.email || "",
    businessType: "",
    city: "",
    state: matchState(kyc.verifications.gst?.details.state),
    ...stored?.applicant,
  };
  const requirement: RequirementDetails = {
    requestedAmount: amountInput(application?.requestedLimit),
    monthlyProcurement: "",
    tenureDays: application?.requestedTenureDays ? String(application.requestedTenureDays) : "",
    businessDuration: "",
    existingFacility: "",
    existingFacilityDetails: "",
    ...stored?.requirement,
  };
  return { applicant, requirement };
}

export function validateApplicant(value: ApplicantDetails): FieldErrors<keyof ApplicantDetails> {
  const errors: FieldErrors<keyof ApplicantDetails> = {};
  if (value.companyName.trim().length < 2) errors.companyName = "Enter your registered business name.";
  if (value.contactPerson.trim().length < 2) errors.contactPerson = "Enter the contact person's name.";
  if (!INDIAN_MOBILE_PATTERN.test(normalizeMobile(value.mobile))) errors.mobile = "Enter a valid 10-digit mobile number.";
  if (!EMAIL_PATTERN.test(value.email.trim())) errors.email = "Enter a valid email address.";
  if (!value.businessType) errors.businessType = "Choose your business type.";
  if (value.city.trim().length < 2) errors.city = "Enter your city.";
  if (!value.state) errors.state = "Choose your state.";
  return errors;
}

export function validateRequirement(value: RequirementDetails): FieldErrors<keyof RequirementDetails> {
  const errors: FieldErrors<keyof RequirementDetails> = {};
  const requested = parseAmount(value.requestedAmount);
  if (requested == null || requested < MIN_REQUESTED_CREDIT) {
    errors.requestedAmount = `Enter an amount of at least ${formatInr(MIN_REQUESTED_CREDIT)}.`;
  } else if (requested > MAX_REQUESTED_CREDIT) {
    errors.requestedAmount = `For requirements above ${formatInr(MAX_REQUESTED_CREDIT)}, please contact us.`;
  }
  const monthly = parseAmount(value.monthlyProcurement);
  if (monthly == null || monthly <= 0) errors.monthlyProcurement = "Enter your approximate monthly procurement.";
  if (!value.tenureDays) errors.tenureDays = "Choose your preferred payment terms.";
  if (!value.businessDuration) errors.businessDuration = "Choose how long you've been in business.";
  if (!value.existingFacility) errors.existingFacility = "Tell us whether you have an existing credit facility.";
  if (value.existingFacility === "yes" && value.existingFacilityDetails.trim().length < 3) {
    errors.existingFacilityDetails = "Share the lender and approximate limit.";
  }
  return errors;
}

export function toDraftPayload(draft: FlowDraft, declarationsAcceptedAt?: string): CreditDraftInput {
  const { applicant, requirement } = draft;
  const requestedLimit = parseAmount(requirement.requestedAmount) ?? 0;
  const monthlyProcurement = parseAmount(requirement.monthlyProcurement) ?? 0;
  const tenure = Number(requirement.tenureDays);
  const purpose = [
    `Website credit request. Monthly procurement approx. ${formatInr(monthlyProcurement)}`,
    `preferred terms ${tenure} days`,
    `in business ${requirement.businessDuration}`,
    requirement.existingFacility === "yes"
      ? `existing facility: ${requirement.existingFacilityDetails.trim()}`
      : "no existing credit facility",
  ].join("; ");

  return {
    requestedLimit,
    requestedTenureDays: tenure,
    purpose: purpose.slice(0, 2000),
    metadata: {
      source: "WEBSITE",
      applicant: {
        companyName: applicant.companyName.trim(),
        contactPerson: applicant.contactPerson.trim(),
        mobile: `+91${normalizeMobile(applicant.mobile)}`,
        email: applicant.email.trim().toLowerCase(),
        businessType: applicant.businessType,
        city: applicant.city.trim(),
        state: applicant.state,
      },
      requirement: {
        monthlyProcurement,
        preferredPaymentTermsDays: tenure,
        businessDuration: requirement.businessDuration,
        existingCreditFacility: requirement.existingFacility === "yes",
        existingCreditDetails:
          requirement.existingFacility === "yes" ? requirement.existingFacilityDetails.trim().slice(0, 500) : null,
      },
      ...(declarationsAcceptedAt
        ? { declarations: { accepted: true, acceptedAt: declarationsAcceptedAt } }
        : {}),
    },
  };
}
