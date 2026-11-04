import type { Metadata } from "next";
import { COMPANY } from "@/content/company";
import { env } from "@/lib/env";
import { SITE } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

/** Canonical public URLs — never localhost even if env was mis-set at build time. */
export function absoluteUrl(path = "/"): string {
  const base = env.siteUrl.includes("localhost")
    ? "https://www.polystorex.com"
    : env.siteUrl;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({ title, description, path, image, noIndex }: PageMeta): Metadata {
  const fullTitle = path === "/" ? SITE.title : `${title} | ${SITE.name}`;

  const ogImage = image ?? "/opengraph-image";
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_IN",
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  const sameAs = Object.values(env.social).filter((url): url is string => Boolean(url));
  const email = env.contactEmail ?? COMPANY.email;
  const telephone = env.contactPhone ?? COMPANY.phoneTel;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: SITE.name,
    brand: SITE.name,
    url: env.siteUrl,
    logo: absoluteUrl("/brand/polystorex-logo.png"),
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${COMPANY.address.buildingNo}, ${COMPANY.address.premises}, ${COMPANY.address.street}, ${COMPANY.address.locality}`,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.pinCode,
      addressCountry: "IN",
    },
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "IN",
      email,
      telephone,
      availableLanguage: ["en", "hi"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: env.siteUrl,
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
