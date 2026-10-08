import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_8px_24px_-10px_rgb(30_111_255/0.7)] hover:bg-accent-600 hover:shadow-[0_12px_28px_-10px_rgb(30_111_255/0.75)]",
  secondary: "bg-brand text-white hover:bg-brand-700",
  ghost: "border border-line bg-white text-brand-800 hover:border-brand-200 hover:bg-paper",
  light: "bg-white text-brand-800 hover:bg-brand-50",
  "outline-light":
    "border border-white/25 bg-white/5 text-white backdrop-blur hover:border-white/50 hover:bg-white/10",
  link: "rounded-none px-0 text-accent-600 hover:text-accent-700",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant === "link" ? "h-auto" : sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
    />
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

type ExternalButtonProps = ComponentProps<"a"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function ExternalButton({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ExternalButtonProps) {
  return (
    <a className={buttonClasses(variant, size, className)} rel="noopener" {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
