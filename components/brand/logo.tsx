import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

type LogoProps = {
  className?: string;
  /** `dark` = dark text on light surfaces; `light` = light text on dark surfaces. */
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
 * Navbar/footer logo: orbit mark + CSS wordmark.
 *
 * The client lockup PNG uses a white wordmark, which disappears on white headers.
 * Always render the mark + toned wordmark so the brand stays visible on light and dark surfaces.
 */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  wordmarkClassName,
  variant = "full",
}: LogoProps) {
  const onDarkSurface = tone === "light";

  if (variant === "mark" || !showWordmark) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <LogoMark />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        onDarkSurface && "rounded-xl bg-black/25 px-2 py-1 ring-1 ring-white/15",
        className,
      )}
      aria-label={SITE.name}
    >
      <LogoMark />
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
    </span>
  );
}
