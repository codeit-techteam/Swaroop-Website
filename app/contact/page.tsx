import type { Metadata } from "next";
import { Clock, Headset, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import {
  COMPANY,
  COMPANY_MAILTO,
  COMPANY_TEL,
  formatRegisteredAddress,
} from "@/content/company";
import { ENQUIRY_TOPICS, type EnquiryTopic } from "@/lib/services/enquiries";
import { platformLinks } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to PolyStoreX about sourcing materials, selling on the platform, business credit, logistics or partnerships.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const requested = typeof params.topic === "string" ? params.topic : undefined;
  const defaultTopic = ENQUIRY_TOPICS.find((topic) => topic.value === requested)?.value as
    | EnquiryTopic
    | undefined;
  const addressLines = formatRegisteredAddress("\n").split("\n");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumb={{ name: "Contact", path: "/contact" }}
        title="Let's talk about your materials."
        description="Whether you're sourcing, selling, or exploring credit, the PolyStoreX team will route your message to the right desk."
      />
      <section className="section bg-paper">
        <div className="container grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14">
          <ContactForm defaultTopic={defaultTopic} />
          <aside className="space-y-4">
            <div className="card space-y-4 p-7">
              <h2 className="text-lg font-semibold">Company</h2>
              <p className="font-medium text-brand-800">{COMPANY.legalName}</p>
              <p className="flex gap-2 text-[0.95rem] leading-relaxed text-ink-muted">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <a
                href={COMPANY_MAILTO}
                className="flex items-center gap-2 text-ink-muted hover:text-brand-800"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-accent" /> {COMPANY.email}
              </a>
              <a
                href={COMPANY_TEL}
                className="flex items-center gap-2 text-ink-muted hover:text-brand-800"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-accent" /> {COMPANY.phoneDisplay}
              </a>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink-muted hover:text-brand-800"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" /> WhatsApp{" "}
                {COMPANY.whatsappDisplay}
              </a>
            </div>
            <div className="card p-7">
              <Clock aria-hidden="true" className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-lg font-semibold">What happens next</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                Your enquiry is logged with a reference number and reviewed by the PolyStoreX team, who
                will respond by email or phone.
              </p>
            </div>
            <div className="card p-7">
              <Headset aria-hidden="true" className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-lg font-semibold">Already a customer or seller?</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                For order, payment or shipment issues, raise a support ticket from your dashboard so it
                is linked to your account.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <a
                  href={platformLinks.customerLogin}
                  rel="noopener"
                  className="text-accent-600 hover:text-accent-700"
                >
                  Customer sign in →
                </a>
                <a
                  href={platformLinks.sellerLogin}
                  rel="noopener"
                  className="text-accent-600 hover:text-accent-700"
                >
                  Seller sign in →
                </a>
              </div>
            </div>
            <p className="flex items-start gap-2 px-2 text-sm text-ink-subtle">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Please don't share PAN, bank or other sensitive financial details in this form.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
