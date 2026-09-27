import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: "text" | "rect" | "circle" | "card";
}

export function Skeleton({
  className,
  variant = "text",
  ...props
}: SkeletonProps) {
  const base = "skeleton-base rounded-md";
  const variantClass =
    variant === "text"
      ? "h-4 w-full"
      : variant === "circle"
        ? "h-12 w-12 rounded-full"
        : variant === "card"
          ? "h-64 w-full rounded-2xl"
          : "h-32 w-full rounded-xl";

  return (
    <div
      role="status"
      aria-label="Cargando"
      className={cn(base, variantClass, className)}
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  readonly lines?: number;
  readonly className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="text"
          style={{
            width:
              idx === lines - 1
                ? "55%"
                : `${90 - Math.random() * 25}%`,
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { readonly className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton variant="card" />
      <Skeleton variant="text" className="h-6 w-2/3" />
      <SkeletonText lines={2} />
    </div>
  );
}
