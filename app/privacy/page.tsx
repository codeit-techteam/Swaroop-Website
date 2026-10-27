import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How PolyStoreX collects, uses, stores and protects information on its website and platform.",
  path: "/privacy",
});

const SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect only what we need to operate the PolyStoreX website and platform:</p>
        <ul>
          <li>Contact details you submit through our forms, such as name, company, email, phone and your message.</li>
          <li>Account details used to sign in, such as mobile number or email address.</li>
          <li>Business verification details for trading and credit, such as GSTIN, PAN, business type and supporting documents.</li>
          <li>Credit application details, including requested amounts and the financial documents you upload.</li>
          <li>Basic technical data needed to keep the service secure, such as IP address and browser information.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: (
      <ul>
        <li>To respond to enquiries and provide the services you request.</li>
        <li>To verify businesses and comply with legal and regulatory obligations.</li>
        <li>To process purchase requests, orders, payments, logistics and credit applications.</li>
        <li>To secure the platform, prevent fraud and investigate misuse.</li>
        <li>To improve our services using aggregated, non-identifying usage information.</li>
      </ul>
    ),
  },
  {
    id: "verification",
    title: "Business verification",
    body: (
      <p>
        GSTIN and PAN verification is performed by PolyStoreX's servers through our verification partner -
        never directly from your browser. We store verification results with masked identifiers and
        show only masked values back to you.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Sharing",
    body: (
      <>
        <p>We do not sell personal information. We share information only:</p>
        <ul>
          <li>With service providers that host, store, verify or deliver our services on our behalf.</li>
          <li>With counterparties to a transaction, to the extent needed to complete that transaction.</li>
          <li>With credit or credit-insurance partners when you apply for business credit.</li>
          <li>Where required by law, regulation or valid legal process.</li>
        </ul>
        <p>Your financial and KYC documents are not shared with sellers.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Storage and security",
    body: (
      <p>
        Documents are stored in access-controlled cloud storage and are served only through
        time-limited signed links. Access within PolyStoreX is limited to staff who need it for
        verification, operations or credit review, and administrative actions are audit-logged.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <p>
        The website uses essential browser storage to keep you signed in during a credit application.
        We do not load third-party advertising trackers. If analytics is enabled, we record only
        anonymous interaction events and never include KYC, PAN, GST or document information.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: (
      <p>
        You can request access to, correction of, or deletion of your personal information, subject to
        legal record-keeping requirements. To make a request, <Link href="/contact?topic=OTHER" className="font-semibold text-accent-600">contact us</Link>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy as our services evolve. The date at the top shows when it last changed.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      path="/privacy"
      updated="8 October 2026"
      intro={<p>This policy explains how PolyStoreX handles information when you use our website and platform.</p>}
      sections={SECTIONS}
    />
  );
}
