import { useEffect, useMemo } from "react";
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Github as GitHubIcon,
  Linkedin as LinkedInIcon,
  Twitter as TwitterIcon,
  Dribbble as DribbbleIcon,
  Calendar as CalendarIcon,
  Send as SendIcon,
  CheckCircle2 as CheckIcon,
  AlertCircle as AlertIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useContactForm } from "@/hooks/useContactForm";
import { profile } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import type { UserProfile, ContactFormInput } from "@/types/portfolio";
import type {
  FieldErrors,
  FieldName,
  UseFormRegisterReturn,
} from "react-hook-form";

interface ContactProps {
  readonly profile?: UserProfile | null;
}

const SOCIAL_ICON_MAP: Readonly<Record<string, LucideIcon>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  dribbble: DribbbleIcon,
};

export function Contact({ profile: propProfile }: ContactProps) {
  const resolvedProfile: UserProfile = useMemo(
    () => propProfile ?? profile,
    [propProfile],
  );

  const {
    form,
    submitting,
    submitSuccess,
    submitError,
    onSubmit,
    resetStatus,
  } = useContactForm();

  useEffect(() => {
    if (!submitSuccess && !submitError) return;
    const timer = setTimeout(() => {
      resetStatus();
    }, 6000);
    return () => clearTimeout(timer);
  }, [submitSuccess, submitError, resetStatus]);

  const focusFirstError = (
    errors: FieldErrors<ContactFormInput>,
  ): void => {
    const ordered: readonly FieldName<ContactFormInput>[] = [
      "name",
      "email",
      "message",
    ];
    for (const field of ordered) {
      if (errors[field]) {
        void form.setFocus(field);
        break;
      }
    }
  };

  const handleFormSubmit = form.handleSubmit(
    async (values) => {
      await onSubmit(values);
    },
    (errors) => {
      focusFirstError(errors);
    },
  );

  const fullName = `${resolvedProfile.firstName} ${resolvedProfile.lastName}`;

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 scroll-mt-20"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Contacto"
          title="Hablemos de tu próximo proyecto"
          description="¿Tienes una idea, colaboración o posición abierta? Escríbeme y respondo en menos de 48h."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full overflow-hidden">
          <div className="glass-card p-6 sm:p-8 space-y-6 h-fit">
            <div className="space-y-2">
              <p className="text-lg font-bold text-foreground">{fullName}</p>
              <p className="paragraph text-sm">{resolvedProfile.title}</p>
            </div>

            <div className="space-y-4">
              <ContactRow
                icon={MailIcon}
                label="Email"
                value={resolvedProfile.email}
                href={`mailto:${resolvedProfile.email}`}
              />
              {resolvedProfile.phone ? (
                <ContactRow
                  icon={PhoneIcon}
                  label="Teléfono"
                  value={resolvedProfile.phone}
                  href={`tel:${resolvedProfile.phone.replace(/\s+/g, "")}`}
                />
              ) : null}
              <ContactRow
                icon={MapPinIcon}
                label="Ubicación"
                value={resolvedProfile.location}
              />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Disponibilidad
                  </span>
                  <Badge
                    variant="primary"
                    size="sm"
                    className="w-fit mt-0.5"
                  >
                    Disponible Septiembre 2026
                  </Badge>
                </div>
              </div>
            </div>

            {resolvedProfile.socials.length > 0 ? (
              <div className="pt-2 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                  Sígueme
                </p>
                <div className="flex flex-wrap gap-2">
                  {resolvedProfile.socials.map((social) => {
                    const Icon = SOCIAL_ICON_MAP[social.iconKey.toLowerCase()] ?? GitHubIcon;
                    return (
                      <Button
                        key={social.id}
                        variant="outline"
                        size="icon"
                        aria-label={social.platform}
                        onClick={() => window.open(social.url, "_blank", "noopener,noreferrer")}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="glass-card p-6 sm:p-8 w-full min-w-0">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-5 w-full min-w-0"
              noValidate
            >
              <Input
                id="name"
                label="Nombre"
                required
                autoFocus
                registration={form.register("name") as unknown as UseFormRegisterReturn<never>}
                error={form.formState.errors.name}
                autoComplete="name"
              />
              <Input
                id="email"
                type="email"
                label="Email"
                required
                registration={form.register("email") as unknown as UseFormRegisterReturn<never>}
                error={form.formState.errors.email}
                autoComplete="email"
              />
              <Textarea
                id="message"
                label="Mensaje"
                required
                rows={6}
                hint="Max 4000 caracteres."
                registration={form.register("message") as unknown as UseFormRegisterReturn<never>}
                error={form.formState.errors.message}
              />

              <div className="flex flex-col gap-3 pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  loading={submitting}
                  rightIcon={SendIcon}
                  className="w-full sm:w-auto sm:min-w-[12rem]"
                >
                  Enviar mensaje
                </Button>

                {submitError ? (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-md border border-destructive/30 bg-red-50 dark:bg-red-950/30 text-destructive p-3 text-sm"
                  >
                    <AlertIcon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="leading-relaxed">{submitError}</p>
                  </div>
                ) : null}

                {submitSuccess ? (
                  <div
                    role="status"
                    className={cn(
                      "flex items-start gap-2.5 rounded-md border p-3 text-sm",
                      "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30",
                      "text-emerald-700 dark:text-emerald-300",
                    )}
                  >
                    <CheckIcon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="leading-relaxed">
                      Mensaje enviado correctamente. Te responderé pronto.
                    </p>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}

function ContactRow({ icon: Icon, label, value, href }: ContactRowProps) {
  const content = (
    <div className="flex items-center gap-3 w-full min-w-0">
      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground truncate">
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block w-full rounded-lg transition-colors hover:bg-accent/5 -mx-2 px-2 py-1.5"
      >
        {content}
      </a>
    );
  }

  return <div className="w-full py-1.5">{content}</div>;
}
