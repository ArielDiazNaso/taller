import {
  profile,
  skills,
  experience,
  projects,
  projectTags,
} from "@/data/portfolioData";
import { generateId, sanitizeHtml } from "@/lib/utils";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  ApiResponse,
  ContactFormInput,
  ContactMessage,
  PortfolioData,
} from "@/types/portfolio";

const ARTIFICIAL_DELAY_MIN_MS = 350;
const ARTIFICIAL_DELAY_MAX_MS = 900;

function randomDelay(): Promise<void> {
  const ms =
    ARTIFICIAL_DELAY_MIN_MS +
    Math.random() * (ARTIFICIAL_DELAY_MAX_MS - ARTIFICIAL_DELAY_MIN_MS);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchPortfolioData(): Promise<
  ApiResponse<PortfolioData>
> {
  try {
    await randomDelay();
    return {
      success: true,
      data: {
        profile,
        skills: [...skills],
        experience: [...experience].sort((a, b) => a.order - b.order),
        projects: [...projects].sort((a, b) => a.order - b.order),
        projectTags: [...projectTags],
      },
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown data fetch error";
    return { success: false, error: message };
  }
}

export async function submitContactMessage(
  payload: ContactFormInput,
): Promise<ApiResponse<ContactMessage>> {
  try {
    const sanitized: ContactFormInput = {
      name: sanitizeHtml(payload.name),
      email: sanitizeHtml(payload.email),
      message: sanitizeHtml(payload.message),
    };

    if (!sanitized.name || !sanitized.email || !sanitized.message) {
      return { success: false, error: "Hay campos vacíos tras sanitización." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized.email)) {
      return { success: false, error: "Formato de email inválido." };
    }

    const newId = generateId("msg");
    const createdAt = new Date().toISOString();

    // Persistencia directa en Base de Datos Supabase (PostgreSQL en la nube)
    if (isSupabaseConfigured && supabase) {
      console.log("[Supabase Contact Submit] Intentando guardar en tabla contact_messages...", sanitized);
      try {
        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: sanitized.name,
              email: sanitized.email,
              message: sanitized.message,
            },
          ]);

        if (dbError) {
          console.error("[Supabase Insert Error]:", dbError);
        } else {
          console.log("[Supabase Insert Success]: Mensaje guardado en PostgreSQL.");
        }
      } catch (dbErr) {
        console.error("[Supabase Exception]:", dbErr);
      }
    } else {
      console.warn("[Supabase] No está configurado o faltan variables de entorno en Vercel.");
    }

    await randomDelay();

    const persisted: ContactMessage = {
      id: newId,
      name: sanitized.name,
      email: sanitized.email,
      message: sanitized.message,
      createdAt,
      read: false,
      replied: false,
    };

    return { success: true, data: persisted };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown submission error";
    return { success: false, error: message };
  }
}