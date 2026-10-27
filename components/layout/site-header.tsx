"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { TrackedLink } from "@/components/ui/tracked-link";
import { PRIMARY_NAV } from "@/content/site";
import { platformLinks } from "@/lib/env";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        solid
          ? cn(
              "border-b border-line/80 shadow-[0_1px_0_rgb(11_46_89/0.03)] backdrop-blur-xl",
              open ? "bg-white" : "bg-white/90",
            )
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand"
      >
        Skip to content
      </a>
      <div className="container flex h-[var(--header-h)] items-center justify-between gap-3 sm:gap-6">
        <Link href="/" aria-label="PolyStoreX home" className="rounded-lg">
          <Logo
            tone={solid ? "dark" : "light"}
            wordmarkClassName="max-sm:text-[1rem] max-sm:tracking-[0.1em] max-[359px]:hidden"
          />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors",
                      solid
                        ? active
                          ? "text-brand-800"
                          : "text-ink-muted hover:text-brand-800"
                        : active
                          ? "text-white"
                          : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            href="/request-credit"
            event="request_credit_click"
            eventProps={{ location: "header" }}
            variant={solid ? "ghost" : "outline-light"}
            size="sm"
            className="hidden md:inline-flex"
          >
            Request Credit
          </TrackedLink>
          <TrackedLink
            href={platformLinks.customerRegister}
            external
            event="platform_cta_click"
            eventProps={{ location: "header", platform: "customer" }}
            size="sm"
            className="max-sm:px-3.5"
          >
            Get Started
          </TrackedLink>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors xl:hidden",
              solid ? "text-brand-800 hover:bg-mist" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line bg-white xl:hidden"
      >
        <nav aria-label="Mobile" className="container flex min-h-full flex-col py-6">
          <ul className="divide-y divide-line">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-brand-800"
                >
                  {item.label}
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-ink-subtle" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8">
            <TrackedLink
              href="/request-credit"
              event="request_credit_click"
              eventProps={{ location: "mobile_nav" }}
              variant="secondary"
              size="lg"
            >
              Request Credit
            </TrackedLink>
            <TrackedLink
              href={platformLinks.customerRegister}
              external
              event="platform_cta_click"
              eventProps={{ location: "mobile_nav", platform: "customer" }}
              size="lg"
              arrow
            >
              Get Started
            </TrackedLink>
            <TrackedLink
              href={platformLinks.sellerRegister}
              external
              event="sell_cta_click"
              eventProps={{ location: "mobile_nav" }}
              variant="ghost"
              size="lg"
            >
              Sell With PolyStoreX
            </TrackedLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
