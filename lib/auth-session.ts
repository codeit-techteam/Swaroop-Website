/**
 * Website session tokens issued by the Petrotrade backend (`/auth/*`). The website
 * runs on its own origin, so it keeps its own copy of the session; identity is
 * always derived server-side from the bearer token.
 */
const STORAGE_KEY = "swaroop-web-session";

export const SESSION_EXPIRED_EVENT = "swaroop-web-session-expired";
export const SESSION_CHANGED_EVENT = "swaroop-web-session-changed";

export type SessionTokens = {
  accessToken: string;
  refreshToken?: string | null;
};

let memory: SessionTokens | null = null;

function isUsableJwt(token: string | null | undefined): token is string {
  return Boolean(token && token.split(".").length === 3 && token.length > 40);
}

export function readSession(): SessionTokens | null {
  if (typeof window === "undefined") return memory;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return memory;
    const parsed = JSON.parse(raw) as Partial<SessionTokens>;
    if (!isUsableJwt(parsed.accessToken)) {
      memory = null;
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    memory = {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken ?? null,
    };
    return memory;
  } catch {
    return memory;
  }
}

export function writeSession(tokens: SessionTokens): void {
  memory = tokens;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    /* storage unavailable - memory copy still serves this tab */
  }
  window.dispatchEvent(new Event(SESSION_CHANGED_EVENT));
}

export function clearSession(): void {
  memory = null;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(SESSION_CHANGED_EVENT));
}

/** Reads `exp` without verifying the signature - only used to refresh early. */
export function tokenExpiresAt(token: string): number | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const json = atob(segment.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as { exp?: unknown };
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isTokenExpiring(token: string, skewMs = 60_000): boolean {
  const exp = tokenExpiresAt(token);
  if (exp == null) return false;
  return Date.now() >= exp - skewMs;
}
