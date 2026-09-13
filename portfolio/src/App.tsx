import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePortfolio } from "@/hooks/usePortfolio";

function LoadingShell() {
  return (
    <>
      <section className="min-h-[92vh] flex items-center">
        <div className="container grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2 flex flex-col gap-6 max-w-3xl">
            <div className="w-48 h-8 rounded-full bg-muted animate-pulse" />
            <SkeletonText lines={2} className="gap-4" />
            <div className="w-3/4 h-10 rounded-md bg-muted animate-pulse" />
            <SkeletonText lines={3} />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-24 rounded-full bg-muted animate-pulse"
                />
              ))}
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-40 rounded-xl bg-muted animate-pulse" />
              <div className="h-12 w-40 rounded-xl bg-muted animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-[280px] aspect-square rounded-3xl bg-muted animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <SectionTitle eyebrow="Trayectoria" title="Sobre mí" description="Cargando..." />
          <div className="grid lg:grid-cols-12 gap-8 mt-10">
            <div className="lg:col-span-5">
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-40 aspect-square rounded-3xl bg-muted animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <SkeletonText lines={2} />
                  </div>
                </div>
                <SkeletonText lines={4} />
              </Card>
            </div>
            <div className="lg:col-span-7">
              <Card className="p-8">
                <SkeletonText lines={5} />
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <SectionTitle eyebrow="Stack técnico" title="Matriz de habilidades" description="Cargando..." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} className="!space-y-0" />
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-7xl">
          <SectionTitle eyebrow="Portafolio" title="Proyectos destacados" description="Cargando..." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ErrorState({ error, onRetry }: { readonly error: string; readonly onRetry: () => void }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card glass className="p-8 flex flex-col items-center text-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center">
              <AlertCircle className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                No se pudieron cargar los datos
              </h2>
              <p className="paragraph text-sm">{error}</p>
            </div>
            <Button variant="primary" leftIcon={RefreshCw} onClick={onRetry}>
              Reintentar
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export function App() {
  const { data, loading, error, refetch } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[80rem] bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] bg-accent/5 blur-3xl rounded-full" />
      </div>

      <Navbar />

      <main>
        {loading ? (
          <LoadingShell />
        ) : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (
          <>
            <Hero profile={data?.profile} skills={data?.skills} />
            <About profile={data?.profile} experience={data?.experience} />
            <Skills skills={data?.skills} />
            <Projects projects={data?.projects} tags={data?.projectTags} />
            <Contact profile={data?.profile} />
          </>
        )}
      </main>

      <Footer socials={data?.profile?.socials} />
    </div>
  );
}
