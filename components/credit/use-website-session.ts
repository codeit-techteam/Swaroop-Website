"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/lib/api-client";
import { SESSION_CHANGED_EVENT, SESSION_EXPIRED_EVENT, readSession } from "@/lib/auth-session";
import { fetchCurrentUser, type AuthUser } from "@/lib/services/auth";

export type SessionState =
  | { status: "loading" }
  | { status: "anonymous"; expired: boolean }
  | { status: "error"; message: string }
  | { status: "authenticated"; user: AuthUser };

export function hasCustomerRole(user: AuthUser): boolean {
  return (user.roles ?? []).some((role) => role.toUpperCase() === "CUSTOMER");
}

/** Resolves the signed-in user from the backend; the token alone is never trusted. */
export function useWebsiteSession() {
  const [state, setState] = useState<SessionState>({ status: "loading" });

  const resolve = useCallback(async (expired = false) => {
    if (!readSession()) {
      setState({ status: "anonymous", expired });
      return;
    }
    setState((prev) => (prev.status === "authenticated" ? prev : { status: "loading" }));
    try {
      const user = await fetchCurrentUser();
      setState({ status: "authenticated", user });
    } catch (error) {
      if (error instanceof ApiError && (error.isUnauthorized || error.isForbidden)) {
        setState({ status: "anonymous", expired: true });
        return;
      }
      setState({
        status: "error",
        message:
          error instanceof ApiError && error.isNetwork
            ? "We couldn't reach PolyStoreX. Check your connection and try again."
            : "We couldn't load your account right now. Please try again.",
      });
    }
  }, []);

  useEffect(() => {
    void resolve();
    const onExpired = () => setState({ status: "anonymous", expired: true });
    const onChanged = () => {
      if (!readSession()) setState((prev) => (prev.status === "anonymous" ? prev : { status: "anonymous", expired: false }));
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    window.addEventListener(SESSION_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
      window.removeEventListener(SESSION_CHANGED_EVENT, onChanged);
    };
  }, [resolve]);

  return {
    state,
    retry: () => void resolve(),
    signedIn: (user: AuthUser) => setState({ status: "authenticated", user }),
  };
}
