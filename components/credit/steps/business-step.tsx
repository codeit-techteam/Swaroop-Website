"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BUSINESS_TYPES, INDIAN_STATES } from "@/content/credit-form";
import { hasErrors, type FieldErrors } from "@/lib/validation";
import { FormField, describedBy } from "../flow-ui";
import { validateApplicant, type ApplicantDetails } from "../flow-model";

type Key = keyof ApplicantDetails;

export function BusinessStep({
  value,
  onChange,
  onContinue,
}: {
  value: ApplicantDetails;
  onChange: (value: ApplicantDetails) => void;
  onContinue: () => void;
}) {
  const [errors, setErrors] = useState<FieldErrors<Key>>({});

  const set = (key: Key) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...value, [key]: event.target.value });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateApplicant(value);
    setErrors(next);
    if (hasErrors(next)) {
      document.getElementById(`biz-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    onContinue();
  }

  const input = (key: Key, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, hint?: string) => (
    <FormField id={`biz-${key}`} label={label} required error={errors[key]} hint={hint}>
      <input
        id={`biz-${key}`}
        className="input"
        value={value[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={describedBy(`biz-${key}`, errors[key], hint)}
        {...props}
      />
    </FormField>
  );

  return (
    <form noValidate onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {input("companyName", "Registered business name", { autoComplete: "organization", maxLength: 160 }, "As it appears on your GST registration")}
        </div>
        {input("contactPerson", "Contact person", { autoComplete: "name", maxLength: 120 })}
        {input("mobile", "Mobile number", { type: "tel", inputMode: "tel", autoComplete: "tel-national", maxLength: 16 })}
        {input("email", "Business email", { type: "email", inputMode: "email", autoComplete: "email", maxLength: 200 })}
        <FormField id="biz-businessType" label="Business type" required error={errors.businessType}>
          <select
            id="biz-businessType"
            className="input"
            value={value.businessType}
            onChange={set("businessType")}
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={describedBy("biz-businessType", errors.businessType)}
          >
            <option value="" disabled>
              Choose a type
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </FormField>
        {input("city", "City", { autoComplete: "address-level2", maxLength: 80 })}
        <FormField id="biz-state" label="State" required error={errors.state}>
          <select
            id="biz-state"
            className="input"
            value={value.state}
            onChange={set("state")}
            aria-invalid={Boolean(errors.state)}
            aria-describedby={describedBy("biz-state", errors.state)}
          >
            <option value="" disabled>
              Choose a state
            </option>
            {INDIAN_STATES.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </FormField>
      </div>
      <div className="mt-8 flex justify-end">
        <Button type="submit" size="lg" arrow>
          Continue to verification
        </Button>
      </div>
    </form>
  );
}
