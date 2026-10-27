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

export function toIdentifier(raw: string): OtpIdentifier | null {
  const value = raw.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { email: value.toLowerCase() };
  }
  const digits = value.replace(/[^\d]/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (/^[6-9]\d{9}$/.test(local)) return { phone: `+91${local}` };
  return null;
}

/** Sends a one-time code. New mobile numbers / emails are registered on verify. */
export async function sendOtp(identifier: OtpIdentifier) {
  return apiRequest<{ message: string; devOtp?: string }>("/auth/otp/send", {
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
