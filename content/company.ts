/**
 * Centralized legal / contact company information for PolyStoreX.
 * Do not invent GSTIN, CIN, incorporation dates or other legal identifiers here.
 */

export const COMPANY = {
  brandName: "PolyStoreX",
  legalName: "Veylron Polychem Private Limited",
  /** Public contact mailbox shown on the website. */
  email: "connect@polystorex.com",
  phoneDisplay: "+91 99626 20101",
  phoneTel: "+919962620101",
  whatsappDisplay: "+91 99626 20101",
  whatsappUrl: "https://wa.me/919962620101",
  address: {
    buildingNo: "Door No. 29",
    premises: "Block A",
    street: "Zinda Street",
    locality: "Sowcarpet, Kondithope",
    city: "Chennai",
    /** Omit from display when identical to city (avoids "Chennai, Chennai"). */
    district: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600001",
    country: "India",
  },
} as const;

/**
 * Standardized public address:
 * Door No. 29, Block A, Zinda Street, Sowcarpet, Kondithope, Chennai, Tamil Nadu 600001, India
 */
export function formatRegisteredAddress(separator = "\n"): string {
  const a = COMPANY.address;
  const cityLine =
    a.district && a.district !== a.city
      ? `${a.city}, ${a.district}`
      : a.city;
  return [
    `${a.buildingNo}, ${a.premises}, ${a.street}`,
    a.locality,
    `${cityLine}, ${a.state} ${a.pinCode}`,
    a.country,
  ].join(separator);
}

/** Single-line address for compact UI (desktop); wraps naturally on mobile. */
export function formatRegisteredAddressInline(): string {
  const a = COMPANY.address;
  return [
    `${a.buildingNo}, ${a.premises}, ${a.street}`,
    a.locality,
    `${a.city}, ${a.state} ${a.pinCode}`,
    a.country,
  ].join(", ");
}

export const COMPANY_MAILTO = `mailto:${COMPANY.email}`;
export const COMPANY_TEL = `tel:${COMPANY.phoneTel}`;
