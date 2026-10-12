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
        d="M14 29.5V11.5h8.25a5.25 5.25 0 0 1 0 10.5H14"
        fill="none"
        stroke={tone === "dark" ? "#FFFFFF" : "#0B2E59"}
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26.5" cy="29.5" r="2.6" fill="#1E6FFF" />
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
          PETROTRADE
        </span>
      ) : null}
    </span>
  );
}
