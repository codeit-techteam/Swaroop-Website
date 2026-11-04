/**
 * Browser-safe configuration only. Never add secrets here: every
 * NEXT_PUBLIC_* value is inlined into the client bundle.
 *
 * CRITICAL: Never allow localhost / vercel.app into siteUrl or sitemap —
 * that previously shipped http://localhost:3004 into production sitemap.xml.
 */
const PRODUCTION_DEFAULTS = {
  siteUrl: "https://polystorex.com",
  /** Client-required sitemap / robots host. */
  sitemapHost: "https://www.polystorex.com",
  apiBaseUrl: "https://swaroop-backend-xzwkz.ondigitalocean.app/api/v1",
  customerAppUrl: "https://customer.polystorex.com",
  sellerAppUrl: "https://seller.polystorex.com",
  adminAppUrl: "https://admin.polystorex.com",
} as const;

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/+$/, "") : undefined;
}

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function isPreviewOrLocalHost(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return (
      host.endsWith(".vercel.app") ||
      host === "localhost" ||
      host.startsWith("127.") ||
      host.includes("localhost")
    );
  } catch {
    return true;
  }
}

/** Reject localhost/preview so production SEO never emits local URLs. */
function productionPublicUrl(value: string | undefined, fallback: string): string {
  const cleaned = clean(value);
  if (!cleaned || isPreviewOrLocalHost(cleaned)) return fallback;
  return cleaned;
}

export const env = {
  siteUrl: productionPublicUrl(
    process.env.NEXT_PUBLIC_SITE_URL,
    PRODUCTION_DEFAULTS.siteUrl,
  ),
  sitemapHost: productionPublicUrl(
    process.env.NEXT_PUBLIC_SITEMAP_HOST,
    PRODUCTION_DEFAULTS.sitemapHost,
  ),
  apiBaseUrl: productionPublicUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    PRODUCTION_DEFAULTS.apiBaseUrl,
  ),
  apiTimeoutMs: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30000),
  customerAppUrl: productionPublicUrl(
    process.env.NEXT_PUBLIC_CUSTOMER_APP_URL,
    PRODUCTION_DEFAULTS.customerAppUrl,
  ),
  sellerAppUrl: productionPublicUrl(
    process.env.NEXT_PUBLIC_SELLER_APP_URL,
    PRODUCTION_DEFAULTS.sellerAppUrl,
  ),
  adminAppUrl: productionPublicUrl(
    process.env.NEXT_PUBLIC_ADMIN_APP_URL,
    PRODUCTION_DEFAULTS.adminAppUrl,
  ),
  playStoreUrl: optional(process.env.NEXT_PUBLIC_PLAY_STORE_URL),
  appStoreUrl: optional(process.env.NEXT_PUBLIC_APP_STORE_URL),
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
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
  customerExternal: true,
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
  customerDashboard: `${env.customerAppUrl}/dashboard`,
  sellerDashboard: `${env.sellerAppUrl}/dashboard`,
  playStore: env.playStoreUrl,
  appStore: env.appStoreUrl,
} as const;

export const PROPOSED_APP_HOSTS = {
  website: PRODUCTION_DEFAULTS.siteUrl,
  customer: PRODUCTION_DEFAULTS.customerAppUrl,
  seller: PRODUCTION_DEFAULTS.sellerAppUrl,
  admin: PRODUCTION_DEFAULTS.adminAppUrl,
} as const;
