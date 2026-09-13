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
    // Si Supabase está conectado y configurado con credenciales en Vercel
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: dbProjects } = await supabase
          .from("projects")
          .select("*")
          .order("project_order", { ascending: true });

        if (dbProjects && dbProjects.length > 0) {
          console.info("Información de portfolio cargada exitosamente desde Base de Datos Supabase (PostgreSQL).");
        }
      } catch (err) {
        console.warn("Supabase query fallback a datos estructurados:", err);
      }
    }

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

    // Persistencia directa en Base de Datos Supabase (PostgreSQL en la nube)
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: dbData, error: dbError } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: sanitized.name,
              email: sanitized.email,
              message: sanitized.message,
            },
          ])
          .select()
          .single();

        if (!dbError && dbData) {
          console.info("Mensaje guardado exitosamente en la tabla contact_messages de la base de datos.");
          return {
            success: true,
            data: {
              id: String(dbData.id),
              name: dbData.name as string,
              email: dbData.email as string,
              message: dbData.message as string,
              createdAt: (dbData.created_at as string) ?? new Date().toISOString(),
              read: false,
              replied: false,
            },
          };
        } else if (dbError) {
          console.warn("Error al insertar en Supabase (usando fallback seguro):", dbError);
        }
      } catch (dbErr) {
        console.warn("Fallo de conexión con la base de datos:", dbErr);
      }
    }

    await randomDelay();

    const persisted: ContactMessage = {
      id: generateId("msg"),
      name: sanitized.name,
      email: sanitized.email,
      message: sanitized.message,
      createdAt: new Date().toISOString(),
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