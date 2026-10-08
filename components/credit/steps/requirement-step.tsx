"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_DURATIONS, PAYMENT_TERMS } from "@/content/credit-form";
import { formatAmountInput, hasErrors, type FieldErrors } from "@/lib/validation";
import { Alert, FormField, describedBy } from "../flow-ui";
import { validateRequirement, type RequirementDetails } from "../flow-model";

type Key = keyof RequirementDetails;

export function RequirementStep({
  value,
  onChange,
  onBack,
  onContinue,
  saving,
  error,
}: {
  value: RequirementDetails;
  onChange: (value: RequirementDetails) => void;
  onBack: () => void;
  onContinue: () => void;
  saving: boolean;
  error: string;
}) {
  const [errors, setErrors] = useState<FieldErrors<Key>>({});

  const update = (patch: Partial<RequirementDetails>) => {
    onChange({ ...value, ...patch });
    const cleared = Object.keys(patch).reduce((acc, key) => ({ ...acc, [key]: undefined }), {});
    setErrors((prev) => ({ ...prev, ...cleared }));
  };

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateRequirement(value);
    setErrors(next);
    if (hasErrors(next)) {
      document.getElementById(`req-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    onContinue();
  }

  const amountField = (key: "requestedAmount" | "monthlyProcurement", label: string, hint: string) => (
    <FormField id={`req-${key}`} label={label} required error={errors[key]} hint={hint}>
      <div className="relative">
        <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle">
          ₹
        </span>
        <input
          id={`req-${key}`}
          className="input pl-8"
          inputMode="numeric"
          autoComplete="off"
          value={value[key]}
          onChange={(event) => update({ [key]: formatAmountInput(event.target.value) })}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={describedBy(`req-${key}`, errors[key], hint)}
        />
      </div>
    </FormField>
  );

  return (
    <form noValidate onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        {amountField("requestedAmount", "Requested credit amount", "The limit you'd like us to consider")}
        {amountField("monthlyProcurement", "Monthly material procurement", "Approximate value you buy each month")}
        <FormField id="req-tenureDays" label="Preferred payment terms" required error={errors.tenureDays}>
          <select
            id="req-tenureDays"
            className="input"
            value={value.tenureDays}
            onChange={(event) => update({ tenureDays: event.target.value })}
            aria-invalid={Boolean(errors.tenureDays)}
            aria-describedby={describedBy("req-tenureDays", errors.tenureDays)}
          >
            <option value="" disabled>
              Choose terms
            </option>
            {PAYMENT_TERMS.map((term) => (
              <option key={term.days} value={term.days}>
                {term.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="req-businessDuration" label="Time in business" required error={errors.businessDuration}>
          <select
            id="req-businessDuration"
            className="input"
            value={value.businessDuration}
            onChange={(event) => update({ businessDuration: event.target.value })}
            aria-invalid={Boolean(errors.businessDuration)}
            aria-describedby={describedBy("req-businessDuration", errors.businessDuration)}
          >
            <option value="" disabled>
              Choose duration
            </option>
            {BUSINESS_DURATIONS.map((duration) => (
              <option key={duration}>{duration}</option>
            ))}
          </select>
        </FormField>

        <fieldset className="sm:col-span-2" aria-describedby={errors.existingFacility ? "req-existingFacility-error" : undefined}>
          <legend className="label">
            Do you have an existing credit facility? <span aria-hidden="true" className="text-accent-600">*</span>
          </legend>
          <div className="mt-1 flex gap-3">
            {(["yes", "no"] as const).map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium has-[:checked]:border-accent has-[:checked]:bg-accent-50 has-[:checked]:text-accent-700"
              >
                <input
                  id={option === "yes" ? "req-existingFacility" : undefined}
                  type="radio"
                  name="existingFacility"
                  value={option}
                  checked={value.existingFacility === option}
                  onChange={() => update({ existingFacility: option })}
                  className="accent-accent"
                />
                {option === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
          {errors.existingFacility ? (
            <p id="req-existingFacility-error" className="field-error">
              {errors.existingFacility}
            </p>
          ) : null}
        </fieldset>

        {value.existingFacility === "yes" ? (
          <FormField
            id="req-existingFacilityDetails"
            label="Existing facility details"
            required
            error={errors.existingFacilityDetails}
            hint="Lender or supplier and approximate limit"
            className="sm:col-span-2"
          >
            <input
              id="req-existingFacilityDetails"
              className="input"
              maxLength={500}
              value={value.existingFacilityDetails}
              onChange={(event) => update({ existingFacilityDetails: event.target.value })}
              aria-invalid={Boolean(errors.existingFacilityDetails)}
              aria-describedby={describedBy(
                "req-existingFacilityDetails",
                errors.existingFacilityDetails,
                "Lender or supplier and approximate limit",
              )}
            />
          </FormField>
        ) : null}
      </div>

      {error ? <Alert tone="error" className="mt-6">{error}</Alert> : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" size="lg" onClick={onBack} disabled={saving}>
          Back
        </Button>
        <Button type="submit" size="lg" arrow={!saving} disabled={saving} aria-busy={saving}>
          {saving ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
          {saving ? "Saving…" : "Save and continue"}
        </Button>
      </div>
    </form>
  );
}
