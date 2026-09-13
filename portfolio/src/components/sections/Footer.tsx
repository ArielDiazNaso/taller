import { Github, Heart, Linkedin, Twitter, Dribbble, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, type FC } from "react";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/portfolio";
import { Button } from "@/components/ui/Button";

export interface FooterProps {
  readonly year?: number;
  readonly socials?: readonly SocialLink[];
  readonly name?: string;
}

const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
  mail: Mail,
};

export const Footer: FC<FooterProps> = ({
  year,
  socials,
  name = "Alejandro Martínez Vázquez",
}) => {
  const currentYear = year ?? new Date().getFullYear();

  const renderedSocials = useMemo(() => {
    if (socials && socials.length > 0) return socials;
    return [
      {
        id: "fs_01",
        platform: "GitHub",
        url: "https://github.com/",
        iconKey: "github",
      },
      {
        id: "fs_02",
        platform: "LinkedIn",
        url: "https://linkedin.com/",
        iconKey: "linkedin",
      },
      {
        id: "fs_03",
        platform: "Twitter",
        url: "https://x.com/",
        iconKey: "twitter",
      },
      {
        id: "fs_04",
        platform: "Dribbble",
        url: "https://dribbble.com/",
        iconKey: "dribbble",
      },
    ] as const satisfies ReadonlyArray<SocialLink>;
  }, [socials]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <footer
      id="footer"
      className="relative mt-24 border-t border-border bg-card/60 backdrop-blur"
      role="contentinfo"
    >
      <div className="container py-12 sm:py-14">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight gradient-text">
                AM
              </span>
              <span className="font-semibold text-foreground/80">
                {name.split(" ")[0]} Portfolio
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Senior Principal Software Architect &amp; Lead Frontend Engineer.
              Diseño sistemas escalables con React, TypeScript y arquitecturas
              limpias.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-center">
            <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
              Navegación
            </p>
            <nav aria-label="Pie de página" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {[
                { href: "#hero", label: "Inicio" },
                { href: "#about", label: "Sobre mí" },
                { href: "#skills", label: "Habilidades" },
                { href: "#projects", label: "Proyectos" },
                { href: "#contact", label: "Contacto" },
                { href: "#hero", label: "Volver arriba" },
              ].map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
              Sígueme
            </p>
            <ul className="flex flex-wrap gap-2">
              {renderedSocials.map((s) => {
                const Icon = socialIconMap[s.iconKey] ?? Github;
                return (
                  <li key={s.id}>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      aria-label={s.platform}
                      className="rounded-full"
                    >
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={s.platform}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col-reverse sm:flex-row justify-between gap-3 items-center">
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
            © {currentYear} {name}. Todos los derechos reservados.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
            Hecho con{" "}
            <Heart
              className="h-3.5 w-3.5 text-destructive fill-current"
              aria-hidden="true"
            />{" "}
            usando React, TypeScript y Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
