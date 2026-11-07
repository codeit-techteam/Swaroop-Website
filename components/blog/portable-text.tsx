import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { imageUrl } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold text-brand-800 sm:text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold text-brand-800">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-accent bg-accent-50/40 py-2 pl-5 pr-4 text-lg font-medium text-brand-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-ink-muted">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-ink-muted">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, { width: 1200 });
      if (!src) return null;
      const alt = (value.alt as string | undefined) ?? "";
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-line">
          <div className="relative aspect-[16/10] w-full">
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>
          {alt ? <figcaption className="px-4 py-3 text-center text-sm text-ink-subtle">{alt}</figcaption> : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-accent-600 underline decoration-accent-300 underline-offset-2 hover:text-accent-700"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-brand-800">{children}</strong>,
  },
};

type BlogPortableTextProps = {
  value: PortableTextBlock[] | undefined;
};

export function BlogPortableText({ value }: BlogPortableTextProps) {
  if (!value?.length) return null;
  return (
    <div className="prose-blog max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
