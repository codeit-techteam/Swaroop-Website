import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { FOOTER_COLUMNS, SITE } from "@/content/site";
import { env, platformLinks } from "@/lib/env";

const SOCIAL_ICONS: Record<keyof typeof env.social, { label: string; path: string }> = {
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.05 0 4.8 2.66 4.8 6.12V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z",
  },
  x: {
    label: "X",
    path: "M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.83-6.32L5.27 21H2.2l7.17-8.2L1.8 3h6.33l4.37 5.78L17.53 3Zm-1.08 16.2h1.7L7.62 4.7H5.8l10.65 14.5Z",
  },
  youtube: {
    label: "YouTube",
    path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z",
  },
};

export function SiteFooter() {
  const socials = (Object.keys(env.social) as (keyof typeof env.social)[])
    .map((key) => ({ key, url: env.social[key], ...SOCIAL_ICONS[key] }))
    .filter((item): item is typeof item & { url: string } => Boolean(item.url));

  return (
    <footer className="relative overflow-hidden bg-brand-900 text-brand-100">
      <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-60" />
      <div className="container relative">
        <section
          aria-labelledby="footer-connect-heading"
          className="flex flex-col gap-8 border-b border-white/10 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">Connect with us</p>
            <h2 id="footer-connect-heading" className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
              Talk to the PolyStoreX team.
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-brand-100/70">
              Sourcing, selling, import trading, credit or partnerships - send us a message and we'll
              route it to the right desk.
            </p>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={buttonClasses("primary", "lg")}>
                Contact Us
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/contact?topic=PARTNERSHIP" className={buttonClasses("outline-light", "lg")}>
                Partner with us
              </Link>
            </div>
            {env.contactEmail || env.contactPhone ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {env.contactEmail ? (
                  <li>
                    <a href={`mailto:${env.contactEmail}`} className="inline-flex items-center gap-2 hover:text-white">
                      <Mail aria-hidden="true" className="h-4 w-4" /> {env.contactEmail}
                    </a>
                  </li>
                ) : null}
                {env.contactPhone ? (
                  <li>
                    <a href={`tel:${env.contactPhone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white">
                      <Phone aria-hidden="true" className="h-4 w-4" /> {env.contactPhone}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
            {socials.length ? (
              <ul className="flex gap-2" aria-label="PolyStoreX on social media">
                {socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand-100 transition-colors hover:border-white/40 hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d={social.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.2fr_2fr] lg:py-20">
          <div className="max-w-sm">
            <Link href="/" aria-label="PolyStoreX home" className="inline-block rounded-lg">
              <Logo tone="light" />
            </Link>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-brand-100/70">
              {SITE.description}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3 text-[0.92rem]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.external === "customer" ? platformLinks.customerLogin : platformLinks.sellerLogin}
                          rel="noopener"
                          className="text-brand-100/70 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-brand-100/70 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 py-8 text-sm text-brand-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <p>Industrial materials, procurement and business credit - built for India.</p>
        </div>
      </div>
    </footer>
  );
}
