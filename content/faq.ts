/**
 * Answers follow the business rules implemented in Swaroop-Backend
 * (Grade Master, blind purchase requests, PetroTrade credit workflow,
 * Surepass-backed KYC, shipment milestones).
 */
export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What materials does Swaroop supply?",
    answer:
      "Swaroop covers polymers (HDPE, LDPE, LLDPE, PP, PET, PVC, ABS, HIPS, Nylon, EVA, POM, PC and more), compounds, masterbatch, elastomers, industrial chemicals, solvents, intermediates, recycled grades, base oils and specialty polymers. Every listing maps to a grade in the Swaroop Grade Master, so you always know exactly what you are buying.",
  },
  {
    question: "How can I buy materials?",
    answer:
      "Create a customer account, complete business verification, then browse grades and the offers available against them. You can add an offer to your cart or raise a purchase request with your quantity, delivery location and payment preference. Swaroop confirms the commercial terms with you before anything is dispatched.",
  },
  {
    question: "How can I sell materials?",
    answer:
      "Register on the Swaroop seller platform and complete seller verification. Once approved, you can manage inventory, publish offers against Grade Master grades, respond to purchase requests and track your orders and settlements from one dashboard.",
  },
  {
    question: "How does procurement work?",
    answer:
      "You choose a grade, review the available offers and submit a purchase request. Swaroop's procurement team works the request, confirms price, quantity and terms with you, and then moves the order through payment, dispatch and delivery. Buyer and seller identities are kept confidential during the request stage.",
  },
  {
    question: "How does credit work?",
    answer:
      "Eligible businesses can apply for a managed credit line. You submit your requirement and financial documents, and Swaroop's credit team reviews the application — this can include document verification and a credit insurance review. If approved, the sanctioned limit and payment terms become available at checkout. Applications are never approved automatically.",
  },
  {
    question: "What documents are required for credit?",
    answer:
      "A GST registration certificate, recent bank statements and ITR or financial statements are required to submit an application. GST returns, a cancelled cheque and business registration documents help the review and may be requested. Files can be PDF, JPG, PNG or WEBP.",
  },
  {
    question: "How is KYC handled?",
    answer:
      "Your GSTIN and PAN are verified server-side by Swaroop through its verification partner — never from your browser — and only masked values are shown back to you. Supporting documents are stored securely and reviewed by the Swaroop compliance team before your account is approved.",
  },
  {
    question: "How are orders tracked?",
    answer:
      "Every order moves through a transparent lifecycle — commercial confirmation, payment, dispatch, shipment and delivery — and each milestone is visible in your Swaroop dashboard together with its documents, such as invoices and delivery records.",
  },
  {
    question: "How does delivery work?",
    answer:
      "Once an order is confirmed and paid (or placed on approved credit), Swaroop coordinates dispatch from the supplier and shares shipment details and status updates until delivery. Serviceability and delivery timelines are confirmed for each order during commercial confirmation.",
  },
  {
    question: "How can I contact Swaroop?",
    answer:
      "Use the contact form on this website and our team will respond to you. Existing customers and sellers can also raise a support ticket from inside their Swaroop dashboard.",
  },
];
