import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TimelineDotVariant =
  | "work"
  | "education"
  | "achievement"
  | "default";

const variantClasses: Record<TimelineDotVariant, string> = {
  work: "bg-primary ring-primary/30",
  education: "bg-accent ring-accent/30",
  achievement: "bg-amber-500 ring-amber-500/30",
  default: "bg-muted-foreground ring-muted-foreground/20",
};

export interface TimelineDotProps {
  readonly variant?: TimelineDotVariant;
  readonly animated?: boolean;
  readonly className?: string;
  readonly size?: number;
}

export function TimelineDot({
  variant = "default",
  animated = true,
  className,
  size = 16,
}: TimelineDotProps) {
  return (
    <div className="relative flex items-center justify-center shrink-0" aria-hidden="true">
      <motion.span
        initial={animated ? { scale: 0, opacity: 0 } : false}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        style={{ width: size, height: size }}
        className={cn(
          "relative rounded-full ring-4 shadow-sm",
          variantClasses[variant],
          className,
        )}
      >
        {animated ? (
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-inherit opacity-40"
          />
        ) : null}
      </motion.span>
    </div>
  );
}
