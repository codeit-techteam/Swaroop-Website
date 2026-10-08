import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  formatAmountInput,
  hasErrors,
  isValidGstin,
  isValidPan,
  normalizeMobile,
  panFromGstin,
  parseAmount,
} from "../lib/validation.ts";

describe("GSTIN / PAN validation", () => {
  it("accepts well-formed identifiers", () => {
    assert.equal(isValidGstin("27AAPFU0939F1ZV"), true);
    assert.equal(isValidGstin(" 27aapfu0939f1zv "), true);
    assert.equal(isValidPan("AAPFU0939F"), true);
  });

  it("rejects malformed identifiers", () => {
    assert.equal(isValidGstin("27AAPFU0939F1Z"), false);
    assert.equal(isValidGstin("27AAPFU0939F0ZV"), false);
    assert.equal(isValidPan("AAPF0939F"), false);
  });

  it("derives the PAN embedded in a GSTIN", () => {
    assert.equal(panFromGstin("27AAPFU0939F1ZV"), "AAPFU0939F");
    assert.equal(panFromGstin("invalid"), null);
  });
});

describe("mobile numbers", () => {
  it("normalises +91 and spacing", () => {
    assert.equal(normalizeMobile("+91 98765 43210"), "9876543210");
    assert.equal(normalizeMobile("919876543210"), "9876543210");
    assert.equal(normalizeMobile("98765-43210"), "9876543210");
  });
});

describe("amounts", () => {
  it("parses Indian-formatted rupee amounts", () => {
    assert.equal(parseAmount("₹ 25,00,000"), 2_500_000);
    assert.equal(parseAmount("1500.50"), 1500.5);
    assert.equal(parseAmount("abc"), null);
    assert.equal(parseAmount("1.234"), null);
  });

  it("formats typed digits with Indian grouping", () => {
    assert.equal(formatAmountInput("2500000"), "25,00,000");
    assert.equal(formatAmountInput("12a3"), "123");
    assert.equal(formatAmountInput(""), "");
  });
});

describe("hasErrors", () => {
  it("ignores cleared fields", () => {
    assert.equal(hasErrors({ name: undefined }), false);
    assert.equal(hasErrors({ name: "Required" }), true);
  });
});
