import { cn } from "@/lib/utils";

export interface SectionTitleProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly className?: string;
  readonly id?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionTitleProps) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col gap-3 max-w-3xl mb-10 sm:mb-14",
        align === "center" ? "text-center mx-auto items-center" : "",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
          {eyebrow}
          <span
            className="h-px w-6 bg-primary/60 hidden sm:inline-block"
            aria-hidden="true"
          />
        </span>
      ) : null}
      <h2 className="heading-lg text-foreground">{title}</h2>
      {description ? (
        <p className={cn("paragraph max-w-2xl", align === "center" ? "mx-auto" : "")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
