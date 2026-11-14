import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * `light` = official lockup on a dark surface (white wordmark, transparent).
   * `dark` = official lockup on a light surface (dark wordmark, transparent — no black plate).
   */
  tone?: "dark" | "light";
  showWordmark?: boolean;
  variant?: "full" | "mark";
};

/** Orbital symbol only. Use in compact slots; the wordmark lives in the full lockup. */
export function LogoMark({ className }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Image
      src="/brand/polystorex-symbol.png"
      alt="PolyStoreX"
      width={216}
      height={169}
      className={cn("h-8 w-auto shrink-0", className)}
      priority
    />
  );
}

/**
 * Official PolyStoreX lockup. The wordmark is part of the artwork — it is not set in CSS.
 */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
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

  const src = onDarkSurface
    ? "/brand/polystorex-logo-transparent.png"
    : "/brand/polystorex-logo-on-light.png";

  return (
    <Image
      src={src}
      alt="PolyStoreX"
      width={848}
      height={372}
      priority
      className={cn(
        "w-auto max-w-[46vw] self-start object-contain",
        onDarkSurface ? "h-11 sm:h-14" : "h-12 sm:h-16",
        className,
      )}
    />
  );
}
