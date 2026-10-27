/**
 * Browser-safe configuration only. Never add secrets here: every
 * NEXT_PUBLIC_* value is inlined into the client bundle.
 *
 * Fallbacks are the deployed PolyStoreX production endpoints (the same values the
 * Customer / Seller / Admin web apps ship with), so a production build can never
 * silently point at localhost.
 */
const PRODUCTION_DEFAULTS = {
  // Deployed Vercel host (swaroop-website.vercel.app currently 404s; petrotrade.in is parked).
  siteUrl: "https://swaroop-website-mocha.vercel.app",
  apiBaseUrl: "https://swaroop-backend-xzwkz.ondigitalocean.app/api/v1",
  customerAppUrl: "https://swaroop-customer-webapp.vercel.app",
  sellerAppUrl: "https://swaroop-seller-webapp.vercel.app",
} as const;

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/+$/, "") : undefined;
}

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const env = {
  siteUrl: clean(process.env.NEXT_PUBLIC_SITE_URL) ?? PRODUCTION_DEFAULTS.siteUrl,
  apiBaseUrl:
    clean(process.env.NEXT_PUBLIC_API_BASE_URL) ??
    PRODUCTION_DEFAULTS.apiBaseUrl,
  apiTimeoutMs: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30000),
  customerAppUrl:
    clean(process.env.NEXT_PUBLIC_CUSTOMER_APP_URL) ??
    PRODUCTION_DEFAULTS.customerAppUrl,
  sellerAppUrl:
    clean(process.env.NEXT_PUBLIC_SELLER_APP_URL) ??
    PRODUCTION_DEFAULTS.sellerAppUrl,
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  /** Published only when explicitly configured with verified details. */
  contactEmail: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  contactPhone: optional(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  social: {
    linkedin: optional(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
    x: optional(process.env.NEXT_PUBLIC_SOCIAL_X),
    youtube: optional(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
  },
} as const;

export const platformLinks = {
  customerHome: env.customerAppUrl,
  customerPurchaseRequest: `${env.customerAppUrl}/purchase-requests/create`,
  customerLogin: `${env.customerAppUrl}/login`,
  customerRegister: `${env.customerAppUrl}/register`,
  customerMarketplace: `${env.customerAppUrl}/marketplace`,
  customerCredit: `${env.customerAppUrl}/payments/request-credit`,
  customerKyc: `${env.customerAppUrl}/kyc`,
  sellerLogin: `${env.sellerAppUrl}/login`,
  sellerRegister: `${env.sellerAppUrl}/register`,
  customerImportBuy: `${env.customerAppUrl}/import/buy/new`,
  sellerImportSell: `${env.sellerAppUrl}/import/sell/new`,
} as const;
