import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/Drawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  readonly activeSection?: string;
  readonly onActiveChange?: (section: string) => void;
}

interface NavLink {
  readonly id: string;
  readonly href: string;
  readonly label: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { id: "hero", href: "#hero", label: "Inicio" },
  { id: "about", href: "#about", label: "Sobre mí" },
  { id: "skills", href: "#skills", label: "Habilidades" },
  { id: "projects", href: "#projects", label: "Proyectos" },
  { id: "contact", href: "#contact", label: "Contacto" },
];

const SECTION_IDS: readonly string[] = NAV_LINKS.map((l) => l.id);

export function Navbar({ activeSection, onActiveChange }: NavbarProps = {}) {
  const [internalActive, setInternalActive] = useState<string>("hero");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const currentActive = activeSection ?? internalActive;

  const firstName = profile.firstName ?? "Alejandro";
  const lastName = profile.lastName ?? "Martínez";
  const fullName = `${firstName} ${lastName.split(" ")[0] ?? "Martínez"}`;
  const brandInitials = "AM";

  useEffect(() => {
    setMounted(true);
  }, []);

  const setActive = useCallback(
    (section: string) => {
      if (onActiveChange) {
        onActiveChange(section);
      } else {
        setInternalActive(section);
      }
    },
    [onActiveChange],
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setActive(sectionId);
      setDrawerOpen(false);
    },
    [setActive],
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) return;

    let pendingId: string | null = null;
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const nextId = visible[0].target.id;
          if (rafId !== null) cancelAnimationFrame(rafId);
          pendingId = nextId;
          rafId = requestAnimationFrame(() => {
            if (pendingId) setActive(pendingId);
            pendingId = null;
            rafId = null;
          });
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [setActive]);

  const navVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.06,
          delayChildren: 0.05,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -6 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      },
    }),
    [],
  );

  return (
    <motion.header
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={navVariants}
      className="sticky top-0 z-40 border-b border-border/60 glass glass-card !rounded-none !shadow-none"
      role="banner"
    >
      <div className="container h-16 sm:h-[4.5rem] flex items-center justify-between gap-3">
        <motion.a
          href="#hero"
          variants={itemVariants}
          onClick={(e) => handleLinkClick(e, "hero")}
          className="flex items-center gap-3 shrink-0 group select-none"
          aria-label="Ir al inicio"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg shadow-primary/20 font-black text-lg text-primary-foreground tracking-tight transition-transform group-hover:scale-105">
            {brandInitials}
          </span>
          <span className="hidden sm:inline-flex flex-col leading-none">
            <span className="gradient-text font-extrabold text-base sm:text-lg tracking-tight">
              {firstName}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium -mt-0.5">
              {lastName.split(" ")[0] ?? "Martínez"}
            </span>
          </span>
          <span className="sr-only">{fullName}</span>
        </motion.a>

        <LayoutGroup id="nav-indicator">
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentActive === link.id;
              return (
                <motion.a
                  key={link.id}
                  href={link.href}
                  variants={itemVariants}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 32,
                        mass: 0.6,
                      }}
                      aria-hidden="true"
                    />
                  ) : null}
                </motion.a>
              );
            })}
          </nav>
        </LayoutGroup>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-1 sm:gap-2 shrink-0"
        >
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-controls="mobile-drawer"
            aria-expanded={drawerOpen}
            className="md:hidden rounded-full"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            side="right"
            ariaLabel="Menú de navegación móvil"
          >
            <DrawerHeader title="Navegación" showClose />
            <DrawerContent id="mobile-drawer" className="pt-2">
              <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = currentActive === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.08 * idx,
                        ease: "easeOut",
                      }}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={cn(
                        "group flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-foreground/85 hover:text-foreground hover:bg-muted/60 border border-transparent",
                      )}
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-200",
                          isActive
                            ? "bg-primary scale-100 opacity-100"
                            : "bg-muted-foreground/30 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-60",
                        )}
                      />
                    </motion.a>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
