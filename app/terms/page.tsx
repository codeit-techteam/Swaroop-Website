import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the Swaroop website and platform.",
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance",
    body: (
      <p>
        By using the Swaroop website or platform you agree to these terms. If you use Swaroop on behalf
        of a business, you confirm you are authorised to bind that business.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and verification",
    body: (
      <ul>
        <li>You must provide accurate business information and keep it up to date.</li>
        <li>Swaroop may verify GSTIN, PAN and business documents, and may refuse or suspend access where verification fails.</li>
        <li>You are responsible for activity under your account and for keeping sign-in credentials secure.</li>
      </ul>
    ),
  },
  {
    id: "marketplace",
    title: "Marketplace and orders",
    body: (
      <ul>
        <li>Information on this website is general and does not constitute an offer to sell.</li>
        <li>Prices, availability and delivery timelines are confirmed only during commercial confirmation of an order.</li>
        <li>Each order is subject to the commercial terms confirmed for that order.</li>
      </ul>
    ),
  },
  {
    id: "credit",
    title: "Business credit",
    body: (
      <ul>
        <li>Submitting a credit application does not guarantee approval.</li>
        <li>Approval, limits, tenure and payment terms are decided by Swaroop after review and may change.</li>
        <li>Applicants must provide genuine documents; false or misleading information may lead to rejection and account suspension.</li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <p>
        You must not misuse the platform, attempt to access data that isn't yours, interfere with its
        security, or use it for unlawful trade.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        The website is provided for general information. To the extent permitted by law, Swaroop is not
        liable for indirect or consequential losses arising from its use.
      </p>
    ),
  },
  {
    id: "legal",
    title: "Legal",
    body: (
      <p>
        These terms are governed by the laws of India. For legal notices or questions about these terms,{" "}
        <Link href="/contact?topic=OTHER" className="font-semibold text-accent-600">
          contact us
        </Link>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      breadcrumb="Terms"
      path="/terms"
      updated="8 October 2026"
      intro={<p>These terms govern your use of the Swaroop website and the Swaroop platform.</p>}
      sections={SECTIONS}
    />
  );
}
