import {
  profile,
  skills,
  experience,
  projects,
  projectTags,
} from "@/data/portfolioData";
import { generateId, sanitizeHtml } from "@/lib/utils";
import type {
  ApiResponse,
  ContactFormInput,
  ContactMessage,
  PortfolioData,
  UserProfile,
  ExperienceItem,
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
    const res = await fetch("/api/portfolio");
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return { success: true, data: json.data };
      }
    }
    // Fallback si no está corriendo el backend /api en local sin vercel dev
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
    // Si falla la petición de red (ej. en vite dev puro), recurrir a los datos locales
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
  }
}

export async function loginAdmin(password: string): Promise<ApiResponse<{ token: string }>> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Error al autenticar" };
    }
    return { success: true, data: { token: data.token } };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Error de conexión" };
  }
}

export async function updateProfile(
  profileData: UserProfile,
  token: string
): Promise<ApiResponse<void>> {
  try {
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Error al actualizar perfil" };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Error de conexión" };
  }
}

export async function saveExperienceItem(
  item: Partial<ExperienceItem>,
  token: string,
  isEdit = false
): Promise<ApiResponse<void>> {
  try {
    const res = await fetch("/api/admin/experience", {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Error al guardar experiencia" };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Error de conexión" };
  }
}

export async function deleteExperienceItem(
  id: string,
  token: string
): Promise<ApiResponse<void>> {
  try {
    const res = await fetch(`/api/admin/experience?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Error al eliminar experiencia" };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Error de conexión" };
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
