import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  Box,
  Cloud,
  Database,
  GitBranchPlus,
  GitMerge,
  HardDrive,
  Hexagon,
  LayoutDashboard,
  Leaf,
  Palette,
  Server,
  Shapes,
  Sparkles,
  Wand2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Skill } from "@/types/portfolio";
import { SkillCategory } from "@/types/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import {
  cn,
  proficiencyToLabel,
  proficiencyToPercent,
  skillCategoryLabel,
} from "@/lib/utils";

interface SkillsProps {
  readonly skills?: readonly Skill[] | null;
}

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  atom: Atom,
  palette: Palette,
  sparkles: Sparkles,
  shapes: Shapes,
  server: Server,
  hexagon: Hexagon,
  "git-branch-plus": GitBranchPlus,
  database: Database,
  leaf: Leaf,
  "hard-drive": HardDrive,
  box: Box,
  cloud: Cloud,
  workflow: Workflow,
  "git-merge": GitMerge,
};

const tabCategories: readonly SkillCategory[] = [
  SkillCategory.FRONTEND,
  SkillCategory.BACKEND,
  SkillCategory.DATABASE,
  SkillCategory.TOOLS,
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface SkillCardProps {
  readonly skill: Skill;
}

function SkillCard({ skill }: SkillCardProps) {
  const IconComponent: LucideIcon = iconMap[skill.iconKey] ?? Wand2;
  const percent = proficiencyToPercent(skill.proficiency);
  const label = proficiencyToLabel(skill.proficiency);

  return (
    <motion.div variants={cardVariants} className="relative">
      <div className="glass-card p-4 flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
              <IconComponent className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-foreground leading-tight truncate">
                {skill.name}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {label}
              </span>
            </div>
          </div>
          <Badge variant="soft" size="sm">
            +{skill.yearsOfExperience} a
          </Badge>
        </div>

        <div className="relative h-1.5 w-full rounded-full bg-muted/80 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>(SkillCategory.FRONTEND);

  const filteredSkills: Skill[] = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 md:py-28 scroll-mt-24 bg-gradient-to-b from-transparent via-muted/30 to-transparent"
    >
      <div className="container">
        <SectionTitle
          eyebrow="Stack técnico"
          title="Matriz de habilidades"
          description="Categorizadas por dominio y nivel de dominio acumulado."
        />

        <div
          role="tablist"
          aria-label="Categorías de habilidades"
          className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10"
        >
          {tabCategories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <Button
                key={cat}
                role="tab"
                aria-selected={isActive}
                id={`tab-${cat}`}
                aria-controls={`panel-${cat}`}
                variant={isActive ? "primary" : "secondary"}
                size="md"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full transition-all",
                  isActive
                    ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                    : "",
                )}
              >
                {skillCategoryLabel(cat)}
              </Button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={gridVariants}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {filteredSkills.length > 0
                ? filteredSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
                : Array.from({ length: 4 }).map((_, idx) => (
                    <SkeletonCard
                      key={`skeleton-${activeCategory}-${idx}`}
                      className="!space-y-0"
                    />
                  ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
