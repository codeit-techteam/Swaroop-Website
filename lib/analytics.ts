import { env } from "@/lib/env";

/**
 * Funnel events only. Never pass PAN, GSTIN, document names, amounts tied to
 * an identity, or any other KYC / financial data as event properties.
 */
export type AnalyticsEvent =
  | "explore_materials_click"
  | "buy_cta_click"
  | "sell_cta_click"
  | "request_credit_click"
  | "import_cta_click"
  | "credit_application_started"
  | "credit_application_submitted"
  | "contact_form_submitted"
  | "platform_cta_click";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(
  event: AnalyticsEvent,
  properties: Record<string, string | number | boolean> = {},
): void {
  if (!env.enableAnalytics || typeof window === "undefined") return;
  const target = window as DataLayerWindow;
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({ event, ...properties });
}
