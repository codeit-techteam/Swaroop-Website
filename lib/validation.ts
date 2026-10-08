export const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
export const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function normalizeMobile(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

export function isValidGstin(value: string): boolean {
  return GSTIN_PATTERN.test(value.trim().toUpperCase());
}

export function isValidPan(value: string): boolean {
  return PAN_PATTERN.test(value.trim().toUpperCase());
}

/** GSTIN characters 3–12 are the holder's PAN. */
export function panFromGstin(gstin: string): string | null {
  const value = gstin.trim().toUpperCase();
  return isValidGstin(value) ? value.slice(2, 12) : null;
}

export function parseAmount(value: string): number | null {
  const cleaned = value.replace(/[,\s₹]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const amount = Number(cleaned);
  return Number.isFinite(amount) ? amount : null;
}

export function formatAmountInput(value: string): string {
  const digits = value.replace(/[^\d]/g, "").slice(0, 12);
  return digits ? Number(digits).toLocaleString("en-IN") : "";
}

export type FieldErrors<K extends string = string> = Partial<Record<K, string>>;

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some(Boolean);
}
