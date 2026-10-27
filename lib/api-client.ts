import { env } from "@/lib/env";
import {
  SESSION_EXPIRED_EVENT,
  clearSession,
  isTokenExpiring,
  readSession,
  writeSession,
} from "@/lib/auth-session";

/** Backend success envelope (`successResponse` in Swaroop-Backend). */
export type Envelope<T, M = unknown> = {
  success: boolean;
  message?: string;
  data: T;
  meta?: M;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | null;
  /** Backend request ID, safe to show as a support reference. */
  readonly requestId: string | null;

  constructor(
    message: string,
    status: number,
    code: string | null = null,
    requestId: string | null = null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNetwork() {
    return this.status === 0;
  }
}

const NETWORK_MESSAGE =
  "We couldn't reach PolyStoreX right now. Check your connection and try again.";
const SERVER_MESSAGE =
  "Something went wrong on our side. Please try again in a moment.";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  /** Attach the session bearer token (default true). */
  auth?: boolean;
  signal?: AbortSignal;
};

function joinUrl(path: string): string {
  return `${env.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Only short, human-readable validation messages from the backend are surfaced. */
function safeMessage(payload: unknown, status: number): string {
  if (status >= 500) return SERVER_MESSAGE;
  if (payload && typeof payload === "object") {
    const raw = (payload as { message?: unknown }).message;
    const message = Array.isArray(raw) ? raw[0] : raw;
    if (
      typeof message === "string" &&
      message.length > 0 &&
      message.length < 300 &&
      !/\bat\s+\S+\s+\(|Prisma|SQL|stack/i.test(message)
    ) {
      return message;
    }
  }
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "This account doesn't have access to that action.";
  if (status === 404) return "We couldn't find what you were looking for.";
  if (status === 429) return "Too many attempts. Please wait a moment and retry.";
  return "The request could not be completed. Please review and try again.";
}

function errorCode(payload: unknown): string | null {
  if (payload && typeof payload === "object") {
    const code = (payload as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return null;
}

function errorRequestId(payload: unknown): string | null {
  if (payload && typeof payload === "object") {
    const id = (payload as { requestId?: unknown }).requestId;
    if (typeof id === "string" && /^[\w-]{1,80}$/.test(id)) return id;
  }
  return null;
}

async function rawFetch(
  path: string,
  options: RequestOptions,
  token: string | null,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.apiTimeoutMs);
  options.signal?.addEventListener("abort", () => controller.abort(), {
    once: true,
  });
  try {
    return await fetch(joinUrl(path), {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}

let refreshInFlight: Promise<string | null> | null = null;

/** Rotates the refresh token once for all concurrent callers. */
function refreshAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    const session = readSession();
    if (!session?.refreshToken) return null;
    try {
      const response = await rawFetch(
        "/auth/refresh",
        { method: "POST", body: { refreshToken: session.refreshToken } },
        null,
      );
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          clearSession();
          window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
        }
        return null;
      }
      const payload = (await response.json()) as Envelope<{
        accessToken?: string;
        refreshToken?: string;
      }>;
      const accessToken = payload.data?.accessToken;
      if (!accessToken) return null;
      writeSession({
        accessToken,
        refreshToken: payload.data.refreshToken ?? session.refreshToken,
      });
      return accessToken;
    } catch {
      return null;
    }
  })().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

async function currentToken(): Promise<string | null> {
  const session = readSession();
  if (!session) return null;
  if (isTokenExpiring(session.accessToken) && session.refreshToken) {
    return (await refreshAccessToken()) ?? session.accessToken;
  }
  return session.accessToken;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const useAuth = options.auth !== false;
  let token = useAuth ? await currentToken() : null;

  let response: Response;
  try {
    response = await rawFetch(path, options, token);
    if (response.status === 401 && useAuth && token) {
      token = await refreshAccessToken();
      if (token) response = await rawFetch(path, options, token);
    }
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new ApiError(NETWORK_MESSAGE, 0);
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401 && useAuth) {
      clearSession();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    throw new ApiError(
      safeMessage(payload, response.status),
      response.status,
      errorCode(payload),
      errorRequestId(payload),
    );
  }

  return (payload as Envelope<T>).data;
}

export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) return error.message;
  return fallback;
}
