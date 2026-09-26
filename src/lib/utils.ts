import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  SKILL_PROFICIENCY,
  type SkillProficiency,
  type SkillCategory,
} from "@/types/portfolio";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
  });
}

export function formatPeriod(start: string, end: string | null): string {
  const startStr = formatDate(start);
  const endStr = end ? formatDate(end) : "Actualidad";
  return `${startStr} — ${endStr}`;
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength).trim()}…`;
}

export function proficiencyToLabel(p: SkillProficiency): string {
  switch (p) {
    case SKILL_PROFICIENCY.BEGINNER:
      return "Principiante";
    case SKILL_PROFICIENCY.INTERMEDIATE:
      return "Intermedio";
    case SKILL_PROFICIENCY.ADVANCED:
      return "Avanzado";
    case SKILL_PROFICIENCY.EXPERT:
      return "Experto";
    case SKILL_PROFICIENCY.MASTER:
      return "Maestro";
    default:
      return "N/A";
  }
}

export function proficiencyToPercent(p: SkillProficiency): number {
  return (p / 5) * 100;
}

export function skillCategoryLabel(c: SkillCategory): string {
  const map: Record<SkillCategory, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Base de Datos",
    tools: "Herramientas",
  };
  return map[c];
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}
