import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb: { name: string; path: string };
  image?: StaticImageData;
  imageAlt?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, breadcrumb, image, imageAlt = "", children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      <JsonLd data={breadcrumbJsonLd([breadcrumb])} />
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="-z-20 object-cover opacity-60"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/40" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[130px]" />
      )}
      <div aria-hidden="true" className="grid-texture absolute inset-0 -z-10" />
      <div className="container pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-brand-100/70">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-white">
              {breadcrumb.name}
            </li>
          </ol>
        </nav>
        <div data-reveal className="mt-8 max-w-3xl">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1 className="mt-5 text-display-lg font-semibold text-white">{title}</h1>
          {description ? <p className="mt-6 text-lg leading-relaxed text-brand-100/80 sm:text-xl">{description}</p> : null}
          {children ? <div className="mt-10 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
