import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("h-9 w-9 shrink-0", className)}
    >
      <rect width="40" height="40" rx="11" fill={tone === "dark" ? "#0B2E59" : "#FFFFFF"} />
      <path
        d="M27.5 12.5H17.25a4.25 4.25 0 0 0 0 8.5h5.5a4.25 4.25 0 0 1 0 8.5H12.5"
        fill="none"
        stroke={tone === "dark" ? "#FFFFFF" : "#0B2E59"}
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <circle cx="28.6" cy="12.5" r="2.6" fill="#1E6FFF" />
      <circle cx="11.4" cy="29.5" r="2.6" fill="#1E6FFF" />
    </svg>
  );
}

export function Logo({ className, tone = "dark", showWordmark = true, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone === "dark" ? "dark" : "light"} />
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-[1.15rem] font-semibold tracking-[0.16em]",
            tone === "dark" ? "text-brand" : "text-white",
            wordmarkClassName,
          )}
        >
          SWAROOP
        </span>
      ) : null}
    </span>
  );
}
