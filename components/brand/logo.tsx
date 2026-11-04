import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
  wordmarkClassName?: string;
  /** Prefer full final artwork (orbit + PolyStoreX + gold underline + X). */
  variant?: "full" | "mark";
};

export function LogoMark({
  className,
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Image
      src="/brand/polystorex-mark.png"
      alt=""
      width={40}
      height={40}
      className={cn("h-9 w-9 shrink-0 object-contain", className)}
      aria-hidden
      priority
    />
  );
}

/**
 * Production logo lockup from the client artwork.
 * Transparent PNG so the black plate never shows on light headers.
 * On dark footers, a subtle inset keeps the orbit/gold readable.
 */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  wordmarkClassName,
  variant = "full",
}: LogoProps) {
  if (variant === "mark" || !showWordmark) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <LogoMark />
        {showWordmark ? (
          <span
            className={cn(
              "font-display text-[1.15rem] font-semibold tracking-[0.06em]",
              tone === "dark" ? "text-brand" : "text-white",
              wordmarkClassName,
            )}
          >
            {SITE.name}
          </span>
        ) : null}
      </span>
    );
  }

  const onDark = tone === "light";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl transition-shadow duration-300",
        onDark
          ? "bg-black/25 px-2.5 py-1.5 ring-1 ring-white/10 backdrop-blur-[2px]"
          : "px-0.5 py-0.5",
        className,
      )}
    >
      <Image
        src="/brand/polystorex-logo-transparent.png"
        alt={SITE.name}
        width={220}
        height={110}
        className={cn(
          "w-auto object-contain object-left",
          onDark
            ? "h-9 max-w-[168px] sm:h-10 sm:max-w-[196px]"
            : "h-10 max-w-[188px] sm:h-11 sm:max-w-[220px]",
        )}
        priority
      />
    </span>
  );
}
