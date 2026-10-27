"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CircleAlert, CircleCheck, LoaderCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { errorMessage } from "@/lib/api-client";
import { ENQUIRY_TOPICS, submitEnquiry, type EnquiryTopic } from "@/lib/services/enquiries";
import { EMAIL_PATTERN, INDIAN_MOBILE_PATTERN, hasErrors, normalizeMobile, type FieldErrors } from "@/lib/validation";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: EnquiryTopic | "";
  message: string;
  website: string;
};

type FieldKey = Exclude<keyof Fields, "website">;

function validate(fields: Fields): FieldErrors<FieldKey> {
  const errors: FieldErrors<FieldKey> = {};
  if (fields.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Enter a valid work email address.";
  if (fields.phone.trim() && !INDIAN_MOBILE_PATTERN.test(normalizeMobile(fields.phone))) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (!fields.topic) errors.topic = "Choose what you need help with.";
  if (fields.message.trim().length < 20) errors.message = "Tell us a little more (at least 20 characters).";
  if (fields.message.trim().length > 2000) errors.message = "Keep your message under 2,000 characters.";
  return errors;
}

export function ContactForm({ defaultTopic }: { defaultTopic?: EnquiryTopic }) {
  const pathname = usePathname();
  const [fields, setFields] = useState<Fields>({
    name: "",
    company: "",
    email: "",
    phone: "",
    topic: defaultTopic ?? "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors<FieldKey>>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
    if (key !== "website" && errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setState("submitting");
    setServerError("");
    try {
      const result = await submitEnquiry({
        name: fields.name.trim(),
        company: fields.company.trim() || undefined,
        email: fields.email.trim().toLowerCase(),
        phone: fields.phone.trim() ? `+91${normalizeMobile(fields.phone)}` : undefined,
        topic: fields.topic as EnquiryTopic,
        message: fields.message.trim(),
        website: fields.website,
        pagePath: pathname,
      });
      setReference(result.referenceNumber);
      setState("success");
      trackEvent("contact_form_submitted", { topic: fields.topic });
    } catch (error) {
      setServerError(
        errorMessage(error, "Something went wrong while sending your message. Please try again."),
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="status" className="card p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CircleCheck aria-hidden="true" className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Thanks - we've received your message.</h2>
        <p className="mt-3 text-ink-muted">
          Your reference number is <span className="font-semibold text-brand-800">{reference}</span>.
          The PolyStoreX team will get back to you at {fields.email.trim()}.
        </p>
        <Button
          variant="ghost"
          className="mt-8"
          onClick={() => {
            setFields((prev) => ({ ...prev, message: "" }));
            setState("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const submitting = state === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-10" aria-describedby="contact-required-note">
      <p id="contact-required-note" className="text-sm text-ink-subtle">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" required error={errors.name}>
          <input id="contact-name" className="input" autoComplete="name" value={fields.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} maxLength={120} />
        </Field>
        <Field id="contact-company" label="Company" error={errors.company}>
          <input id="contact-company" className="input" autoComplete="organization" value={fields.company} onChange={update("company")} maxLength={160} />
        </Field>
        <Field id="contact-email" label="Work email" required error={errors.email}>
          <input id="contact-email" type="email" inputMode="email" className="input" autoComplete="email" value={fields.email} onChange={update("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} maxLength={200} />
        </Field>
        <Field id="contact-phone" label="Mobile number" error={errors.phone} hint="10-digit Indian mobile">
          <input id="contact-phone" type="tel" inputMode="tel" className="input" autoComplete="tel-national" value={fields.phone} onChange={update("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : "contact-phone-hint"} maxLength={16} />
        </Field>
        <Field id="contact-topic" label="Requirement" required error={errors.topic} className="sm:col-span-2">
          <select id="contact-topic" className="input" value={fields.topic} onChange={update("topic")} aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "contact-topic-error" : undefined}>
            <option value="" disabled>
              Choose a topic
            </option>
            {ENQUIRY_TOPICS.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="contact-message" label="Message" required error={errors.message} className="sm:col-span-2" hint={`${fields.message.trim().length}/2000`}>
          <textarea id="contact-message" rows={5} className="input resize-y" value={fields.message} onChange={update("message")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"} placeholder="Materials, grades, quantities, delivery location - anything that helps us respond quickly." maxLength={2000} />
        </Field>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={update("website")} />
        </div>
      </div>

      {state === "error" ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="flex-1">{serverError}</span>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-subtle">
          We use these details only to respond to your enquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-2">privacy policy</a>.
        </p>
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : state === "error" ? (
            <>
              <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {required ? <span aria-hidden="true" className="text-accent-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
