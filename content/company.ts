/**
 * Centralized legal / contact company information for PolyStoreX.
 * Do not invent GSTIN, CIN, incorporation dates or other legal identifiers here.
 */

export const COMPANY = {
  brandName: "PolyStoreX",
  legalName: "Veylron Polychem Private Limited",
  email: "it@polystorex.com",
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
    district: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600001",
    country: "India",
  },
} as const;

/** Multi-line registered address for legal pages and footer. */
export function formatRegisteredAddress(separator = "\n"): string {
  const a = COMPANY.address;
  return [
    `${a.buildingNo}, ${a.premises}`,
    a.street,
    a.locality,
    `${a.city}, ${a.district}`,
    `${a.state} ${a.pinCode}`,
    a.country,
  ].join(separator);
}

/** Single-line address for compact UI. */
export function formatRegisteredAddressInline(): string {
  return formatRegisteredAddress(", ");
}

export const COMPANY_MAILTO = `mailto:${COMPANY.email}`;
export const COMPANY_TEL = `tel:${COMPANY.phoneTel}`;
