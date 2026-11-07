"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/api-client";
import {
  maskPhone,
  resendOtp,
  sendOtp,
  toPhone,
  verifyOtp,
  type AuthUser,
} from "@/lib/services/auth";
import { platformLinks } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Alert, FormField, describedBy } from "./flow-ui";

const RESEND_SECONDS = 60;

/**
 * Phone-only OTP gate for Request Credit / Track.
 * Existing buyers and new numbers use the same MSG91-backed /auth/otp flow;
 * new mobiles are registered on successful verify (roleHint CUSTOMER).
 */
export function SignInPanel({
  expired,
  onSignedIn,
  title = "Verify your mobile number",
  description = "Enter your Indian mobile number. We'll send a 6-digit OTP. If you already applied for credit, we'll show your Application ID so you can track status. Otherwise you'll continue to the application form.",
}: {
  expired: boolean;
  onSignedIn: (user: AuthUser) => void;
  title?: string;
  description?: string;
}) {
  const [phoneInput, setPhoneInput] = useState("");
  const [phone, setPhone] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; otp?: string }>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const otpRef = useRef<HTMLInputElement>(null);
  const verifyingRef = useRef(false);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendIn]);

  useEffect(() => {
    if (phone) otpRef.current?.focus();
  }, [phone]);

  function parsePhone(): string | null {
    const parsed = toPhone(phoneInput);
    setFieldErrors(
      parsed ? {} : { phone: "Enter a valid 10-digit Indian mobile number (starts with 6–9)." },
    );
    return parsed?.phone ?? null;
  }

  async function requestCode(targetPhone: string, opts?: { resend?: boolean }) {
    setBusy(true);
    setError("");
    try {
      const identifier = { phone: targetPhone };
      const result = opts?.resend ? await resendOtp(identifier) : await sendOtp(identifier);
      setPhone(targetPhone);
      setResendIn(result.resendCooldownSeconds ?? RESEND_SECONDS);
    } catch (err) {
      setError(errorMessage(err, "We couldn't send the OTP. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(code: string) {
    if (!phone || !/^\d{6}$/.test(code) || verifyingRef.current) return;
    verifyingRef.current = true;
    setFieldErrors({});
    setError("");
    setBusy(true);
    try {
      onSignedIn(await verifyOtp({ phone }, code));
    } catch (err) {
      setError(errorMessage(err, "That OTP didn't work. Check it and try again."));
      verifyingRef.current = false;
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (phone) {
      if (!/^\d{6}$/.test(otp.trim())) {
        setFieldErrors({ otp: "Enter the 6-digit OTP we sent to your mobile." });
        return;
      }
      await verifyCode(otp.trim());
      return;
    }

    const target = parsePhone();
    if (!target) return;
    await requestCode(target);
  }

  function changeNumber() {
    setPhone(null);
    setOtp("");
    setError("");
    setFieldErrors({});
    setResendIn(0);
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="card-material relative overflow-hidden p-6 sm:p-8 lg:p-9">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-accent-500 to-accent"
        />

        <div className="flex items-start justify-between gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-700 text-white shadow-[0_12px_28px_-12px_rgb(0_51_141/0.55)]">
            <Smartphone aria-hidden="true" className="h-6 w-6" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand-100">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            OTP secured
          </span>
        </div>

        <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-brand-800 sm:text-[1.7rem]">
          {title}
        </h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{description}</p>

        {expired ? (
          <Alert tone="warning" className="mt-6" title="Your session has ended">
            Verify your mobile again to continue. Saved drafts stay on your account.
          </Alert>
        ) : null}

        <ol className="mt-6 grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
          <li
            className={cn(
              "rounded-xl px-3 py-2.5 text-center ring-1",
              !phone
                ? "bg-brand text-white ring-brand"
                : "bg-paper text-ink-subtle ring-line",
            )}
          >
            1 · Mobile
          </li>
          <li
            className={cn(
              "rounded-xl px-3 py-2.5 text-center ring-1",
              phone ? "bg-brand text-white ring-brand" : "bg-paper text-ink-subtle ring-line",
            )}
          >
            2 · OTP
          </li>
        </ol>

        <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
          {phone ? (
            <>
              <p className="text-sm text-ink-muted">
                Enter the 6-digit OTP sent to{" "}
                <span className="font-semibold text-ink">{maskPhone(phone)}</span>.{" "}
                <button
                  type="button"
                  className="font-semibold text-accent-600 hover:text-accent-700"
                  onClick={changeNumber}
                >
                  Change number
                </button>
              </p>
              <FormField id="signin-otp" label="One-time password" error={fieldErrors.otp}>
                <input
                  ref={otpRef}
                  id="signin-otp"
                  className="input text-center text-2xl font-semibold tracking-[0.45em]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="••••••"
                  value={otp}
                  onChange={(event) => {
                    const next = event.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(next);
                    if (next.length === 6) {
                      void verifyCode(next);
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.otp)}
                  aria-describedby={describedBy("signin-otp", fieldErrors.otp)}
                />
              </FormField>
            </>
          ) : (
            <FormField
              id="signin-phone"
              label="Mobile number"
              error={fieldErrors.phone}
              hint="Indian mobile only. New numbers create a buyer account after OTP verification."
            >
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-semibold text-ink-subtle">
                  +91
                </span>
                <input
                  id="signin-phone"
                  className="input pl-14"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phoneInput}
                  onChange={(event) =>
                    setPhoneInput(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={describedBy(
                    "signin-phone",
                    fieldErrors.phone,
                    "Indian mobile only",
                  )}
                />
              </div>
            </FormField>
          )}

          {error ? <Alert tone="error">{error}</Alert> : null}

          <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
            {busy ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
            {phone ? "Verify OTP & continue" : "Send OTP"}
          </Button>

          {phone ? (
            <p className="text-center text-sm text-ink-muted">
              {resendIn > 0 ? (
                <>Resend OTP in {resendIn}s</>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  className="font-semibold text-accent-600 hover:text-accent-700"
                  onClick={() => void requestCode(phone, { resend: true })}
                >
                  Resend OTP
                </button>
              )}
            </p>
          ) : null}
        </form>
      </div>

      <p className="mt-5 text-center text-sm text-ink-muted">
        Prefer the full app?{" "}
        <a
          href={platformLinks.customerLogin}
          rel="noopener"
          className="font-semibold text-accent-600 hover:text-accent-700"
        >
          Sign in to the customer platform
        </a>
      </p>
    </div>
  );
}
