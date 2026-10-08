"use client";

import { useEffect, useRef, useState } from "react";
import { KeyRound, LoaderCircle, LockKeyhole, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/api-client";
import {
  loginWithPassword,
  sendOtp,
  toIdentifier,
  verifyOtp,
  type AuthUser,
  type OtpIdentifier,
} from "@/lib/services/auth";
import { platformLinks } from "@/lib/env";
import { Alert, FormField, describedBy } from "./flow-ui";

type Mode = "otp" | "password";

const RESEND_SECONDS = 30;

export function SignInPanel({
  expired,
  onSignedIn,
  title = "Sign in to apply for credit",
}: {
  expired: boolean;
  onSignedIn: (user: AuthUser) => void;
  title?: string;
}) {
  const [mode, setMode] = useState<Mode>("otp");
  const [identifierInput, setIdentifierInput] = useState("");
  const [identifier, setIdentifier] = useState<OtpIdentifier | null>(null);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ identifier?: string; otp?: string; password?: string }>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendIn]);

  useEffect(() => {
    if (identifier) otpRef.current?.focus();
  }, [identifier]);

  function parseIdentifier(): OtpIdentifier | null {
    const parsed = toIdentifier(identifierInput);
    setFieldErrors(parsed ? {} : { identifier: "Enter a valid 10-digit mobile number or email address." });
    return parsed;
  }

  async function requestCode(target: OtpIdentifier) {
    setBusy(true);
    setError("");
    try {
      await sendOtp(target);
      setIdentifier(target);
      setResendIn(RESEND_SECONDS);
    } catch (err) {
      setError(errorMessage(err, "We couldn't send the code. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (mode === "otp" && identifier) {
      if (!/^\d{4,8}$/.test(otp.trim())) {
        setFieldErrors({ otp: "Enter the code we sent you." });
        return;
      }
      setFieldErrors({});
      setBusy(true);
      try {
        onSignedIn(await verifyOtp(identifier, otp.trim()));
      } catch (err) {
        setError(errorMessage(err, "That code didn't work. Check it and try again."));
      } finally {
        setBusy(false);
      }
      return;
    }

    const target = parseIdentifier();
    if (!target) return;

    if (mode === "otp") {
      await requestCode(target);
      return;
    }

    if (!password) {
      setFieldErrors({ password: "Enter your password." });
      return;
    }
    setBusy(true);
    try {
      onSignedIn(await loginWithPassword(target, password));
    } catch (err) {
      setError(errorMessage(err, "We couldn't sign you in. Check your details and try again."));
    } finally {
      setBusy(false);
    }
  }

  function switchMode(next: Mode) {
    setMode(next);
    setIdentifier(null);
    setOtp("");
    setPassword("");
    setError("");
    setFieldErrors({});
  }

  const identifierLabel = identifier && "phone" in identifier ? identifier.phone : identifier?.email;

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6 sm:p-9">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
          <LockKeyhole aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
          Use your Swaroop buyer account. New to Swaroop? Signing in with your mobile number creates
          your buyer account.
        </p>

        {expired ? (
          <Alert tone="warning" className="mt-6" title="Your session has ended">
            Sign in again to continue. Anything you've saved to your application is kept.
          </Alert>
        ) : null}

        <div role="tablist" aria-label="Sign-in method" className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-mist p-1 text-sm font-semibold">
          {(
            [
              { value: "otp", label: "One-time code", icon: Smartphone },
              { value: "password", label: "Password", icon: KeyRound },
            ] as const
          ).map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={mode === tab.value}
              onClick={() => switchMode(tab.value)}
              className={
                mode === tab.value
                  ? "flex items-center justify-center gap-2 rounded-full bg-white py-2 text-brand-800 shadow-sm"
                  : "flex items-center justify-center gap-2 rounded-full py-2 text-ink-muted hover:text-brand-800"
              }
            >
              <tab.icon aria-hidden="true" className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
          {mode === "otp" && identifier ? (
            <>
              <p className="text-sm text-ink-muted">
                Enter the code sent to <span className="font-semibold text-ink">{identifierLabel}</span>.{" "}
                <button type="button" className="font-semibold text-accent-600 hover:text-accent-700" onClick={() => switchMode("otp")}>
                  Change
                </button>
              </p>
              <FormField id="signin-otp" label="Verification code" error={fieldErrors.otp}>
                <input
                  ref={otpRef}
                  id="signin-otp"
                  className="input tracking-[0.4em]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                  aria-invalid={Boolean(fieldErrors.otp)}
                  aria-describedby={describedBy("signin-otp", fieldErrors.otp)}
                />
              </FormField>
            </>
          ) : (
            <FormField id="signin-identifier" label="Mobile number or email" error={fieldErrors.identifier}>
              <input
                id="signin-identifier"
                className="input"
                autoComplete="username"
                value={identifierInput}
                onChange={(event) => setIdentifierInput(event.target.value)}
                aria-invalid={Boolean(fieldErrors.identifier)}
                aria-describedby={describedBy("signin-identifier", fieldErrors.identifier)}
              />
            </FormField>
          )}

          {mode === "password" ? (
            <FormField id="signin-password" label="Password" error={fieldErrors.password}>
              <input
                id="signin-password"
                type="password"
                className="input"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={describedBy("signin-password", fieldErrors.password)}
              />
            </FormField>
          ) : null}

          {error ? <Alert tone="error">{error}</Alert> : null}

          <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
            {busy ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
            {mode === "otp" ? (identifier ? "Verify and continue" : "Send code") : "Sign in"}
          </Button>

          {mode === "otp" && identifier ? (
            <p className="text-center text-sm text-ink-muted">
              {resendIn > 0 ? (
                <>Resend code in {resendIn}s</>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  className="font-semibold text-accent-600 hover:text-accent-700"
                  onClick={() => void requestCode(identifier)}
                >
                  Resend code
                </button>
              )}
            </p>
          ) : null}
        </form>
      </div>
      <p className="mt-5 text-center text-sm text-ink-muted">
        Prefer the full app?{" "}
        <a href={platformLinks.customerLogin} rel="noopener" className="font-semibold text-accent-600 hover:text-accent-700">
          Sign in to the customer platform
        </a>
      </p>
    </div>
  );
}
