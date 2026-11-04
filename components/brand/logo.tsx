import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

type LogoProps = {
  className?: string;
  /** `dark` = dark text on light surfaces; `light` = light lockup on dark surfaces. */
  tone?: "dark" | "light";
  showWordmark?: boolean;
  wordmarkClassName?: string;
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
 * Production navbar/footer logo.
 *
 * Light surfaces: orbit mark + navy/gold CSS wordmark (the client PNG uses a white
 * wordmark, which disappears on white headers when the black plate is removed).
 * Dark surfaces: full transparent lockup (white wordmark readable on navy).
 */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  wordmarkClassName,
  variant = "full",
}: LogoProps) {
  const onDarkSurface = tone === "light";

  if (variant === "mark" || !showWordmark || !onDarkSurface) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <LogoMark />
        {showWordmark ? (
          <span
            className={cn(
              "font-display text-[1.2rem] font-semibold tracking-[0.04em]",
              onDarkSurface ? "text-white" : "text-brand",
              wordmarkClassName,
            )}
          >
            PolyStore
            <span className={onDarkSurface ? "text-accent" : "text-accent-600"}>X</span>
          </span>
        ) : null}
      </span>
    );
  }

  // Dark footer / transparent header over hero imagery
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl bg-black/30 px-2.5 py-1.5 ring-1 ring-white/15",
        className,
      )}
    >
      <Image
        src="/brand/polystorex-logo-transparent.png"
        alt={SITE.name}
        width={220}
        height={110}
        className="h-9 w-auto max-w-[180px] object-contain object-left sm:h-10 sm:max-w-[210px]"
        priority
      />
    </span>
  );
}
