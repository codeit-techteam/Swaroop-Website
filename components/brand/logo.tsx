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
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Image
      src="/brand/polystorex-logo.png"
      alt=""
      width={36}
      height={36}
      className={cn(
        "h-9 w-9 shrink-0 object-contain",
        tone === "light" ? "brightness-0 invert" : "",
        className,
      )}
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
      <LogoMark tone={tone === "dark" ? "dark" : "light"} />
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
