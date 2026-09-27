import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "soft" | "primary" | "accent";
type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-muted text-muted-foreground border border-border",
  primary:
    "bg-primary/10 text-primary border border-primary/20",
  accent:
    "bg-accent/10 text-accent border border-accent/20",
  outline:
    "bg-transparent text-foreground border border-border",
  soft:
    "bg-secondary text-secondary-foreground border-transparent",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "text-[11px] px-2 py-0.5 rounded-full",
  md: "text-xs px-3 py-1 rounded-full",
};

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-tight transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
