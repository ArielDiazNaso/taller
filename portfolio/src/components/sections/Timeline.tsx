import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ExperienceItem } from "@/types/portfolio";
import { ExperienceType } from "@/types/portfolio";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TimelineDot } from "@/components/ui/TimelineDot";
import type { TimelineDotVariant } from "@/components/ui/TimelineDot";
import { formatPeriod, cn } from "@/lib/utils";

interface TimelineProps {
  readonly items: readonly ExperienceItem[];
}

function mapExperienceTypeToDotVariant(
  type: ExperienceType,
): TimelineDotVariant {
  switch (type) {
    case ExperienceType.WORK:
      return "work";
    case ExperienceType.EDUCATION:
      return "education";
    case ExperienceType.ACHIEVEMENT:
      return "achievement";
    default:
      return "default";
  }
}

const cardVariantsLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariantsSingle = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const expandVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Timeline({ items }: TimelineProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const sortedItems: ExperienceItem[] = [...items].sort(
    (a, b) => a.order - b.order,
  );

  const toggleExpanded = (id: string): void => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-[400px] w-full py-4">
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-border/70 lg:left-1/2 lg:-translate-x-1/2"
        aria-hidden="true"
      />

      <ol className="relative flex flex-col gap-10">
        {sortedItems.map((item, index) => {
          const isLeftSide = index % 2 === 0;
          const isExpanded = expandedIds[item.id] === true;
          const isAchievement = item.type === ExperienceType.ACHIEVEMENT;
          const dotVariant = mapExperienceTypeToDotVariant(item.type);

          return (
            <li
              key={item.id}
              className="relative lg:grid lg:grid-cols-2 lg:gap-10"
            >
              <div
                className="absolute left-4 top-6 -translate-x-1/2 lg:left-1/2 z-10"
                aria-hidden="true"
              >
                <TimelineDot variant={dotVariant} size={18} />
              </div>

              <div
                className={cn(
                  "pl-12 lg:pl-0",
                  isLeftSide
                    ? "lg:pr-14 lg:col-start-1 lg:row-start-1"
                    : "lg:col-start-2 lg:row-start-1 lg:pl-14 lg:col-end-3",
                )}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={
                    typeof window !== "undefined" && window.innerWidth >= 1024
                      ? isLeftSide
                        ? cardVariantsLeft
                        : cardVariantsRight
                      : cardVariantsSingle
                  }
                >
                  <Card
                    glass
                    hoverLift
                    className={cn(
                      "relative overflow-hidden",
                      isAchievement
                        ? "border-amber-400/50 ring-1 ring-amber-300/20"
                        : "",
                    )}
                  >
                    {isAchievement ? (
                      <div
                        className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="absolute -top-7 -right-7 w-28 rotate-45 bg-gradient-to-l from-amber-400 to-amber-500 py-1 shadow-md" />
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => toggleExpanded(item.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`timeline-content-${item.id}`}
                      className="w-full text-left p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-2xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-foreground truncate">
                              {item.institution}
                            </span>
                            <Badge
                              variant={
                                isAchievement ? "accent" : "primary"
                              }
                              size="sm"
                            >
                              {formatPeriod(item.startDate, item.endDate)}
                            </Badge>
                          </div>
                          <h4 className="text-base font-semibold text-foreground/95 leading-snug">
                            {item.title}
                          </h4>
                          {item.location ? (
                            <span className="text-xs text-muted-foreground">
                              {item.location}
                            </span>
                          ) : null}
                        </div>

                        <div
                          className={cn(
                            "shrink-0 p-2 rounded-full bg-muted/70 text-muted-foreground transition-transform duration-300",
                            isExpanded ? "rotate-180" : "rotate-0",
                          )}
                          aria-hidden="true"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded ? (
                        <motion.div
                          id={`timeline-content-${item.id}`}
                          key={`content-${item.id}`}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={expandVariants}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-0 flex flex-col gap-4 border-t border-border/50">
                            <p className="paragraph text-sm pt-4">
                              {item.description}
                            </p>

                            {item.bulletPoints.length > 0 ? (
                              <ul className="flex flex-col gap-2">
                                {item.bulletPoints.map((point, idx) => (
                                  <li
                                    key={`bp-${item.id}-${idx}`}
                                    className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed"
                                  >
                                    <span
                                      className="inline-block mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                                      aria-hidden="true"
                                    />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
