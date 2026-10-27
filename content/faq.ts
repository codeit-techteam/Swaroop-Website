/**
 * Answers follow the business rules implemented in Swaroop-Backend
 * (Grade Master, blind purchase requests, PolyStoreX credit workflow,
 * Surepass-backed KYC, shipment milestones).
 */
export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What materials does PolyStoreX supply?",
    answer:
      "PolyStoreX covers polymers (HDPE, LDPE, LLDPE, PP, PET, PVC, ABS, HIPS, Nylon, EVA, POM, PC and more), compounds, masterbatch, elastomers, industrial chemicals, solvents, intermediates, recycled grades, base oils and specialty polymers. Every listing maps to a grade in the PolyStoreX Grade Master, so you always know exactly what you are buying.",
  },
  {
    question: "How can I buy materials?",
    answer:
      "Create a customer account, complete business verification, then browse grades and the offers available against them. You can add an offer to your cart or raise a purchase request with your quantity, delivery location and payment preference. PolyStoreX confirms the commercial terms with you before anything is dispatched.",
  },
  {
    question: "How can I sell materials?",
    answer:
      "Register on the PolyStoreX seller platform and complete seller verification. Once approved, you can manage inventory, publish offers against Grade Master grades, respond to purchase requests and track your orders and settlements from one dashboard.",
  },
  {
    question: "How does procurement work?",
    answer:
      "You choose a grade, review the available offers and submit a purchase request. PolyStoreX's procurement team works the request, confirms price, quantity and terms with you, and then moves the order through payment, dispatch and delivery. Buyer and seller identities are kept confidential during the request stage.",
  },
  {
    question: "How does credit work?",
    answer:
      "Eligible businesses can apply for a managed credit line. You submit your requirement and financial documents, and PolyStoreX's credit team reviews the application - this can include document verification and a credit insurance review. If approved, the sanctioned limit and payment terms become available at checkout. Applications are never approved automatically.",
  },
  {
    question: "What documents are required for credit?",
    answer:
      "A GST registration certificate, recent bank statements and ITR or financial statements are required to submit an application. GST returns, a cancelled cheque and business registration documents help the review and may be requested. Files can be PDF, JPG, PNG or WEBP.",
  },
  {
    question: "How is KYC handled?",
    answer:
      "Your GSTIN and PAN are verified server-side by PolyStoreX through its verification partner - never from your browser - and only masked values are shown back to you. Supporting documents are stored securely and reviewed by the PolyStoreX compliance team before your account is approved.",
  },
  {
    question: "How are orders tracked?",
    answer:
      "Every order moves through a transparent lifecycle - commercial confirmation, payment, dispatch, shipment and delivery - and each milestone is visible in your PolyStoreX dashboard together with its documents, such as invoices and delivery records.",
  },
  {
    question: "How does delivery work?",
    answer:
      "Once an order is confirmed and paid (or placed on approved credit), PolyStoreX coordinates dispatch from the supplier and shares shipment details and status updates until delivery. Serviceability and delivery timelines are confirmed for each order during commercial confirmation.",
  },
  {
    question: "How can I contact PolyStoreX?",
    answer:
      "Use the contact form on this website and our team will respond to you. Existing customers and sellers can also raise a support ticket from inside their PolyStoreX dashboard.",
  },
];

export const IMPORT_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is import trading on PolyStoreX?",
    answer:
      "Import trading connects Indian buyers with sellers offering imported polymers and petrochemicals. Buyers post an import buy requirement, sellers publish import sell offers, and PolyStoreX matches the two, hosts the negotiation and tracks the shipment from the port of loading to delivery.",
  },
  {
    question: "Who can post import requirements and offers?",
    answer:
      "Buyers post import requirements from the PolyStoreX customer platform, and sellers publish import offers from the seller platform. Both need a verified PolyStoreX business account.",
  },
  {
    question: "How are buyers and sellers matched?",
    answer:
      "Every published listing is scored against open listings on the other side across product, grade, brand, origin, quantity, MOQ, price, currency, Incoterm, ports, payment terms, shipment window and quality. Strong matches are shared with both parties so they can open a negotiation.",
  },
  {
    question: "Is my company name visible to the other party?",
    answer:
      "No. During matching and negotiation each side sees the other only by an anonymous reference, such as BUYER-1A2B3C4D. Commercial terms are visible; company identities are not.",
  },
  {
    question: "How is an import deal confirmed?",
    answer:
      "Either side can counter on price, quantity, payment terms or shipment window. Once one side accepts, a deal is created and becomes binding only after both the buyer and the seller confirm it on the platform.",
  },
  {
    question: "Which Incoterms, currencies and payment terms are supported?",
    answer:
      "Listings can be priced in USD, EUR, CNY or INR on FOB, CFR, CIF, FCA or EXW terms. Payment options include T/T advance and part-payment structures, letters of credit at sight or up to 120 days, D/P, open account and INR terms for domestic settlement.",
  },
];
