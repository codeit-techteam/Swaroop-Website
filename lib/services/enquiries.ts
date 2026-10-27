import { apiRequest } from "@/lib/api-client";

export const ENQUIRY_TOPICS = [
  { value: "BUY_MATERIALS", label: "Buying materials" },
  { value: "SELL_MATERIALS", label: "Selling on PolyStoreX" },
  { value: "CREDIT", label: "Business credit" },
  { value: "LOGISTICS", label: "Logistics & delivery" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "OTHER", label: "Something else" },
] as const;

export type EnquiryTopic = (typeof ENQUIRY_TOPICS)[number]["value"];

export type EnquiryInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  topic: EnquiryTopic;
  message: string;
  /** Honeypot - must stay empty. */
  website?: string;
  pagePath?: string;
};

export function submitEnquiry(input: EnquiryInput) {
  return apiRequest<{ referenceNumber: string; createdAt: string }>(
    "/public/enquiries",
    { method: "POST", auth: false, body: input },
  );
}
