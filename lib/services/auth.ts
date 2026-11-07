import { apiRequest } from "@/lib/api-client";
import { clearSession, readSession, writeSession } from "@/lib/auth-session";

export type AuthUser = {
  id: string;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  status?: string;
  roles?: string[];
};

type SessionPayload = {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
};

export type OtpIdentifier = { phone: string } | { email: string };

/** Indian mobile only — 10 digits starting 6–9, optional +91 / 0 prefix. */
export function toPhone(raw: string): { phone: string } | null {
  const digits = raw.replace(/[^\d]/g, "");
  const local =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  if (/^[6-9]\d{9}$/.test(local)) return { phone: `+91${local}` };
  return null;
}

export function toIdentifier(raw: string): OtpIdentifier | null {
  const value = raw.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { email: value.toLowerCase() };
  }
  return toPhone(value);
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return "+91 ******XXXX";
  return `+91 ******${digits.slice(-4)}`;
}

/** Sends a one-time code. New mobile numbers / emails are registered on verify. */
export async function sendOtp(identifier: OtpIdentifier) {
  return apiRequest<{
    message: string;
    devOtp?: string;
    resendCooldownSeconds?: number;
    expiresInSeconds?: number;
  }>("/auth/otp/send", {
    method: "POST",
    auth: false,
    body: { ...identifier, purpose: "LOGIN" },
  });
}

/** Fresh OTP — invalidates the previous challenge server-side. */
export async function resendOtp(identifier: OtpIdentifier) {
  return apiRequest<{
    message: string;
    resendCooldownSeconds?: number;
    expiresInSeconds?: number;
  }>("/auth/otp/resend", {
    method: "POST",
    auth: false,
    body: { ...identifier, purpose: "LOGIN" },
  });
}

export async function verifyOtp(identifier: OtpIdentifier, otp: string) {
  const session = await apiRequest<SessionPayload>("/auth/otp/verify", {
    method: "POST",
    auth: false,
    body: { ...identifier, otp, purpose: "LOGIN", roleHint: "CUSTOMER" },
  });
  writeSession({
    accessToken: session.accessToken,
    refreshToken: session.refreshToken ?? null,
  });
  return session.user;
}

export async function loginWithPassword(identifier: OtpIdentifier, password: string) {
  const session = await apiRequest<SessionPayload>("/auth/login", {
    method: "POST",
    auth: false,
    body: { ...identifier, password },
  });
  writeSession({
    accessToken: session.accessToken,
    refreshToken: session.refreshToken ?? null,
  });
  return session.user;
}

export async function fetchCurrentUser() {
  return apiRequest<AuthUser>("/auth/me");
}

export async function logout() {
  const session = readSession();
  try {
    if (session) {
      await apiRequest("/auth/logout", {
        method: "POST",
        body: session.refreshToken ? { refreshToken: session.refreshToken } : {},
      });
    }
  } catch {
    /* the local session is cleared regardless */
  } finally {
    clearSession();
  }
}

export function displayName(user: AuthUser | null): string {
  if (!user) return "";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email || user.phone || "PolyStoreX customer";
}
