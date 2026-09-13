import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import type { UserProfile, ExperienceItem } from "@/types/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/sections/Timeline";
import { cn } from "@/lib/utils";

interface AboutProps {
  readonly profile?: UserProfile | null;
  readonly experience?: readonly ExperienceItem[] | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function About({ profile, experience }: AboutProps) {
  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "Nombre de usuario";

  const sortedExperience: ExperienceItem[] = experience
    ? [...experience].sort((a, b) => a.order - b.order)
    : [];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 md:py-28 scroll-mt-24"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle
              eyebrow="Trayectoria"
              title="Sobre mí"
              description="Un poco de contexto sobre mi recorrido profesional y enfoque."
              align="left"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 xl:col-span-5"
            >
              <Card
                glass
                hoverLift
                className={cn(
                  "relative overflow-hidden p-6 sm:p-8 flex flex-col gap-6",
                )}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="relative w-40 aspect-square rounded-3xl overflow-hidden ring-4 ring-border shadow-lg bg-muted">
                      {profile?.avatarUrl ? (
                        <div className="absolute inset-0">
                          <img
                            src={profile.avatarUrl}
                            alt={fullName}
                            width={160}
                            height={160}
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <span className="text-4xl font-bold text-primary/80">
                            {fullName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="heading-md">{fullName}</h3>
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin
                        className="w-4 h-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>{profile?.location ?? "Ubicación"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-foreground/90 tracking-wide uppercase">
                    Destacados
                  </h4>
                  <div className="flex flex-col gap-2">
                    {profile?.highlights?.length
                      ? profile.highlights.map((highlight, idx) => (
                          <Badge
                            key={`hl-${idx}`}
                            variant="primary"
                            size="md"
                            className="justify-start gap-2 py-2 px-3 rounded-xl w-full"
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-left leading-snug">
                              {highlight}
                            </span>
                          </Badge>
                        ))
                      : null}
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <p className="paragraph">
                    {profile?.bio ??
                      "Biografía del usuario. Aquí aparecerá un texto descriptivo sobre el perfil profesional, enfoque y aspiraciones."}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 xl:col-span-7"
            >
              {sortedExperience.length > 0 ? (
                <Timeline items={sortedExperience} />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center">
                  <p className="paragraph text-center">
                    No hay experiencia para mostrar.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
