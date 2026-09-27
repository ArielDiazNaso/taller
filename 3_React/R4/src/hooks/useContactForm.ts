import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitContactMessage } from "@/lib/services";
import { sanitizeHtml } from "@/lib/utils";
import type {
  ApiResponse,
  ContactFormInput,
  ContactMessage,
} from "@/types/portfolio";

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(80, { message: "El nombre no puede superar los 80 caracteres." }),
  email: z
    .string({ required_error: "El email es obligatorio." })
    .trim()
    .email({ message: "Introduce un email válido." })
    .max(200, { message: "El email es demasiado largo." }),
  message: z
    .string({ required_error: "El mensaje es obligatorio." })
    .trim()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." })
    .max(4000, { message: "El mensaje no puede superar los 4000 caracteres." }),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

interface UseContactFormResult {
  readonly form: ReturnType<typeof useForm<ContactFormSchemaType>>;
  readonly submitting: boolean;
  readonly submitSuccess: boolean;
  readonly submitError: string | null;
  readonly lastResponse: ContactMessage | null;
  readonly onSubmit: (values: ContactFormInput) => Promise<void>;
  readonly resetStatus: () => void;
}

export function useContactForm(): UseContactFormResult {
  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<ContactMessage | null>(null);

  const resetStatus = useCallback(() => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setLastResponse(null);
  }, []);

  const onSubmit = useCallback(
    async (values: ContactFormInput) => {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      setLastResponse(null);

      const sanitized: ContactFormInput = {
        name: sanitizeHtml(values.name),
        email: sanitizeHtml(values.email),
        message: sanitizeHtml(values.message),
      };

      let response: ApiResponse<ContactMessage>;
      try {
        response = await submitContactMessage(sanitized);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Error de conexión inesperado.";
        response = { success: false, error: msg };
      }

      if (response.success && response.data) {
        setLastResponse(response.data);
        setSubmitSuccess(true);
        form.reset();
      } else {
        setSubmitError(response.error ?? "No se pudo enviar el mensaje.");
      }

      setSubmitting(false);
    },
    [form],
  );

  return useMemo<UseContactFormResult>(
    () => ({
      form,
      submitting,
      submitSuccess,
      submitError,
      lastResponse,
      onSubmit,
      resetStatus,
    }),
    [form, submitting, submitSuccess, submitError, lastResponse, onSubmit, resetStatus],
  );
}
