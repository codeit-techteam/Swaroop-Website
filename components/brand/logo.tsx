import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function LogoMark({
  className,
}: {
  className?: string;
  /** Kept for call-site compatibility; mark uses brand colors on any surface. */
  tone?: "dark" | "light";
}) {
  return (
    <Image
      src="/brand/polystorex-mark.png"
      alt=""
      width={36}
      height={36}
      className={cn("h-9 w-9 shrink-0 object-contain", className)}
      aria-hidden
      priority
    />
  );
}

export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  wordmarkClassName,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-[1.15rem] font-semibold tracking-[0.08em]",
            tone === "dark" ? "text-brand" : "text-white",
            wordmarkClassName,
          )}
        >
          {SITE.legalName}
        </span>
      ) : null}
    </span>
  );
}
