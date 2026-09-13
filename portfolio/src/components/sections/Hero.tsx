import { useMemo } from "react";
import { motion } from "framer-motion";
import { Briefcase, Mail } from "lucide-react";
import type { Skill, SkillCategory, UserProfile } from "@/types/portfolio";
import { cn, skillCategoryLabel } from "@/lib/utils";
import { profile, skills } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeroProps {
  readonly profile?: UserProfile | null;
  readonly skills?: readonly Skill[] | null;
}

const CATEGORY_BADGE_STYLES: Record<SkillCategory, string> = {
  frontend:
    "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
  backend:
    "bg-accent/10 text-accent border-accent/20 hover:bg-accent/15",
  database:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15",
  tools:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/15",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.08 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const blobVariants = {
  initial: { scale: 0.85, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

function handleScrollTo(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Hero({ profile: propProfile, skills: propSkills }: HeroProps = {}) {
  const resolvedProfile: UserProfile = propProfile ?? profile;
  const resolvedSkills: readonly Skill[] = propSkills ?? skills;

  const firstName = resolvedProfile.firstName ?? "Alejandro";
  const lastName = resolvedProfile.lastName?.split(" ")[0] ?? "Martínez";
  const title =
    resolvedProfile.title ?? "Senior Principal Software Architect";
  const tagline =
    resolvedProfile.tagline ??
    "Diseño sistemas escalables y construyo interfaces que convierten ideas en productos digitales de alta calidad.";
  const avatarUrl =
    resolvedProfile.avatarUrl ??
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop";

  const topSkills: readonly Skill[] = useMemo(() => {
    const sorted = [...resolvedSkills].sort((a, b) => {
      if (b.proficiency !== a.proficiency) {
        return (
          (b.proficiency as number) - (a.proficiency as number)
        );
      }
      return b.yearsOfExperience - a.yearsOfExperience;
    });
    return sorted.slice(0, 6);
  }, [resolvedSkills]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] overflow-hidden flex items-center"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.15),transparent_50%)]" />
        <motion.div
          variants={blobVariants}
          initial="initial"
          animate="animate"
          aria-hidden="true"
          className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl dark:bg-primary/10"
        />
        <motion.div
          variants={blobVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.4, delay: 0.15 }}
          aria-hidden="true"
          className="absolute -bottom-32 -right-16 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl dark:bg-accent/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40 dark:opacity-30"
        />
      </div>

      <div className="container relative z-10 py-12 sm:py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          exit="hidden"
          className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-3"
        >
          <div className="md:col-span-2 flex flex-col gap-6 sm:gap-7 md:gap-8 max-w-3xl">
            <motion.div
              custom={0}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full glass glass-card !rounded-full !shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground/85">
                Disponible para nuevos proyectos
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              custom={1}
              variants={fadeInUp}
              className="heading-xl"
            >
              <span className="block text-foreground/90 font-bold">
                Hola, soy{" "}
              </span>
              <span className="block gradient-text">
                {firstName} {lastName}
              </span>
            </motion.h1>

            <motion.h2
              custom={2}
              variants={fadeInUp}
              className="heading-md sm:text-2xl md:text-3xl text-foreground/90 font-semibold tracking-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeInUp}
              className="paragraph max-w-2xl"
            >
              {tagline}
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeInUp}
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Habilidades destacadas"
            >
              {topSkills.map((skill, idx) => (
                <Badge
                  key={skill.id}
                  role="listitem"
                  size="md"
                  variant="outline"
                  className={cn(
                    "transition-all duration-200 backdrop-blur-sm",
                    CATEGORY_BADGE_STYLES[skill.category],
                  )}
                  style={{
                    animationDelay: `${idx * 60}ms`,
                  }}
                >
                  <span className="font-medium">{skill.name}</span>
                  <span
                    aria-hidden="true"
                    className="ml-1.5 h-1 w-1 rounded-full bg-current opacity-60"
                  />
                  <span className="ml-1.5 text-[10px] uppercase tracking-wider opacity-80 font-semibold">
                    {skillCategoryLabel(skill.category)}
                  </span>
                </Badge>
              ))}
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            >
              <Button
                size="lg"
                variant="primary"
                leftIcon={Briefcase}
                onClick={() => handleScrollTo("projects")}
                aria-label="Ver la sección de proyectos"
              >
                Ver proyectos
              </Button>
              <Button
                size="lg"
                variant="outline"
                rightIcon={Mail}
                onClick={() => handleScrollTo("contact")}
                aria-label="Ir a la sección de contacto"
              >
                Contáctame
              </Button>
            </motion.div>
          </div>

          <motion.div
            custom={2}
            variants={fadeInUp}
            className="md:col-span-1 flex justify-center md:justify-end"
          >
            <div className="relative">
              <motion.div
                aria-hidden="true"
                animate={{
                  rotate: [0, 6, -4, 3, 0],
                  scale: [1, 1.02, 0.99, 1.01, 1],
                }}
                transition={{
                  duration: 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary via-accent to-primary opacity-30 blur-2xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="relative glass glass-card p-3 sm:p-4 rounded-[2rem] w-[min(78vw,320px)] aspect-square"
              >
                <div className="absolute inset-3 sm:inset-4 rounded-[1.5rem] overflow-hidden border border-white/30 dark:border-white/10">
                  <img
                    src={avatarUrl}
                    alt={`Retrato de ${firstName} ${lastName}`}
                    width={600}
                    height={600}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src =
                        "data:image/svg+xml;utf8," +
                        encodeURIComponent(
                          `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='hsl(var(--primary))'/><stop offset='100%' stop-color='hsl(var(--accent))'/></linearGradient></defs><rect width='400' height='400' fill='url(%23g)'/><text x='50%' y='54%' font-family='system-ui,sans-serif' font-size='140' font-weight='800' fill='white' text-anchor='middle' dominant-baseline='middle'>${firstName.charAt(0)}${lastName.charAt(0)}</text></svg>`,
                        );
                    }}
                  />
                </div>
                <motion.div
                  aria-hidden="true"
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass glass-card px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-xl"
                  initial={{ opacity: 0, x: -18, y: 14 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-black text-sm shadow-inner">
                      10+
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        Años exp.
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                        Arquitectura & Liderazgo
                      </span>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass glass-card px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-xl"
                  initial={{ opacity: 0, x: 18, y: -14 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        Open to work
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                        {resolvedProfile.location ?? "Remoto"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
