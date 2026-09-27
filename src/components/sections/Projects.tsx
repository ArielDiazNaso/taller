import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star as StarIcon,
  Calendar as CalendarIcon,
  ArrowUpRight,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/components/ui/Modal";
import { cn, formatPeriod, truncate } from "@/lib/utils";
import { projectTags } from "@/data/portfolioData";
import type { Project, ProjectTag } from "@/types/portfolio";

interface ProjectsProps {
  readonly projects?: readonly Project[] | null;
  readonly tags?: readonly ProjectTag[] | null;
}

export function Projects({ projects, tags }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const resolvedTags: readonly ProjectTag[] = useMemo(
    () => (tags && tags.length > 0 ? tags : projectTags),
    [tags],
  );

  const sortedProjects: readonly Project[] = useMemo(() => {
    if (!projects) return [];
    return [...projects].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.order - b.order;
    });
  }, [projects]);

  const isLoading = projects === null;

  const openProject = (project: Project): void => {
    setSelectedProject(project);
  };

  const closeProject = (): void => {
    setSelectedProject(null);
  };

  const resolveTagsByIds = (
    tagIds: readonly string[],
  ): readonly ProjectTag[] => {
    return tagIds
      .map((id) => resolvedTags.find((t) => t.id === id))
      .filter((t): t is ProjectTag => Boolean(t));
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 scroll-mt-20"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Portafolio"
          title="Proyectos destacados"
          description="Selección de trabajos recientes en SaaS, Fintech, Open Source y producto B2C."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={`skel-${idx}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => {
              const projectTagsResolved = resolveTagsByIds(project.tagIds);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.2, 0.8, 0.2, 1],
                    delay: (index % 3) * 0.08,
                  }}
                >
                  <Card
                    hoverLift
                    glass
                    className="group overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-48 w-full shrink-0 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {project.featured ? (
                        <Badge
                          variant="primary"
                          size="sm"
                          className="absolute top-3 left-3 gap-1"
                        >
                          <StarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          Destacado
                        </Badge>
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 gap-2">
                        {(() => {
                          const demo = project.demoUrl;
                          const repo = project.repoUrl;
                          return (
                            <>
                              {demo ? (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  leftIcon={ExternalLink}
                                  onClick={() => window.open(demo, "_blank", "noopener,noreferrer")}
                                >
                                  Demo
                                </Button>
                              ) : null}
                              {repo ? (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  leftIcon={Github}
                                  onClick={() => window.open(repo, "_blank", "noopener,noreferrer")}
                                >
                                  Repo
                                </Button>
                              ) : null}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <CardContent className="flex flex-col gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="text-left group/title"
                      >
                        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground group-hover/title:text-primary transition-colors inline-flex items-center gap-1.5">
                          {project.title}
                          <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 -translate-y-1 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0 transition-all duration-200 shrink-0" aria-hidden="true" />
                        </h3>
                      </button>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {truncate(project.shortDescription, 90)}
                      </p>
                    </CardContent>

                    <CardFooter className="flex-wrap justify-between pt-2 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {projectTagsResolved.map((tag) => (
                          <Badge
                            key={tag.id}
                            size="sm"
                            variant="default"
                            className={cn(tag.color, "border-transparent")}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openProject(project)}
                        className="ml-auto text-xs"
                      >
                        Ver detalles
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {selectedProject ? (
        <ProjectDetailModal
          project={selectedProject}
          tags={resolveTagsByIds(selectedProject.tagIds)}
          open={Boolean(selectedProject)}
          onOpenChange={closeProject}
        />
      ) : null}
    </section>
  );
}

interface ProjectDetailModalProps {
  readonly project: Project;
  readonly tags: readonly ProjectTag[];
  readonly open: boolean;
  readonly onOpenChange: (next: boolean) => void;
}

function ProjectDetailModal({
  project,
  tags,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalHeader
        title={project.title}
        description={project.shortDescription}
      />
      <ModalContent>
        {project.screenshots.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {project.screenshots.map((src, idx) => (
              <div
                key={`ss-${idx}`}
                className="relative shrink-0 w-[85%] sm:w-[70%] aspect-video rounded-xl overflow-hidden border border-border shadow-soft"
              >
                <img
                  src={src}
                  alt={`${project.title} - Captura ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-soft">
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4 pt-4">
          <p className="paragraph leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-4">
          {project.startDate ? (
            <Badge variant="soft" size="md" className="w-fit gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {formatPeriod(project.startDate, project.endDate)}
            </Badge>
          ) : null}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                size="sm"
                variant="default"
                className={cn(tag.color, "border-transparent")}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        {project.repoUrl ? (
          <Button
            variant="outline"
            leftIcon={Github}
            onClick={() => window.open(project.repoUrl as string, "_blank", "noopener,noreferrer")}
          >
            Ver repositorio
          </Button>
        ) : null}
        {project.demoUrl ? (
          <Button
            variant="primary"
            leftIcon={ExternalLink}
            onClick={() => window.open(project.demoUrl as string, "_blank", "noopener,noreferrer")}
          >
            Abrir demo
          </Button>
        ) : null}
      </ModalFooter>
    </Modal>
  );
}
