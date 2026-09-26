import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly as?: "div" | "article" | "section";
  readonly hoverLift?: boolean;
  readonly glass?: boolean;
}

export function Card({
  className,
  as: Tag = "div",
  hoverLift = false,
  glass = false,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-soft",
        glass ? "glass-card" : "",
        hoverLift
          ? "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
          : "",
        className,
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6 pb-3", className)}
      {...props}
    />
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-snug tracking-tight", className)}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-3", className)} {...props} />;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0 gap-3", className)}
      {...props}
    />
  );
}
