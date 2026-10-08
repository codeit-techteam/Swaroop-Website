"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Variant = Parameters<typeof buttonClasses>[0];
type Size = Parameters<typeof buttonClasses>[1];

type TrackedLinkProps = {
  href: string;
  event: AnalyticsEvent;
  eventProps?: Record<string, string>;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  /** Render without button styling. */
  plain?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function TrackedLink({
  href,
  event,
  eventProps,
  external = false,
  variant = "primary",
  size = "md",
  arrow = false,
  plain = false,
  className,
  children,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const classes = plain ? className : buttonClasses(variant, size, className);
  const handleClick: ComponentProps<"a">["onClick"] = (e) => {
    trackEvent(event, { location: eventProps?.location ?? "unknown", ...eventProps });
    onClick?.(e);
  };
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} rel="noopener" className={classes} onClick={handleClick} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={handleClick} {...rest}>
      {content}
    </Link>
  );
}
