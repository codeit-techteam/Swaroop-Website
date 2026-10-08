export const SITE = {
  name: "Swaroop",
  legalName: "SWAROOP",
  title: "Swaroop | Industrial Materials & B2B Procurement Platform",
  description:
    "Swaroop is a technology-driven B2B platform to source, trade and deliver polymers, petrochemicals and industrial materials across India — with verified supply, structured procurement and business credit.",
  tagline: "Industrial materials. Sourced smarter. Delivered better.",
} as const;

export type NavLink = { href: string; label: string };

export const PRIMARY_NAV: NavLink[] = [
  { href: "/materials", label: "Materials" },
  { href: "/buy-sell", label: "Buy & Sell" },
  { href: "/credit", label: "Credit" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export const FOOTER_COLUMNS: { title: string; links: (NavLink & { external?: "customer" | "seller" })[] }[] = [
  {
    title: "Swaroop",
    links: [
      { href: "/about", label: "About Swaroop" },
      { href: "/contact", label: "Contact" },
      { href: "/about#careers", label: "Careers" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/materials", label: "Materials" },
      { href: "/buy-sell", label: "Buy & Sell" },
      { href: "/credit", label: "Credit" },
      { href: "/how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "customer", label: "Customer Platform", external: "customer" },
      { href: "seller", label: "Seller Platform", external: "seller" },
      { href: "/request-credit", label: "Request Credit" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/#faq", label: "FAQs" },
      { href: "/contact?topic=OTHER", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/terms#legal", label: "Legal" },
    ],
  },
];
