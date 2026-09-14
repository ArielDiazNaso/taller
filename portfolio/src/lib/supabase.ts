import { createClient } from "@supabase/supabase-js";

let rawUrl = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "").trim();
if (rawUrl && !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
  rawUrl = `https://${rawUrl}`;
}

// Extraer únicamente el origen base (ej. https://xxxx.supabase.co) sin rutas como /rest/v1
const originMatch = rawUrl.match(/^https?:\/\/[^/]+/i);
if (originMatch) {
  rawUrl = originMatch[0];
} else {
  rawUrl = rawUrl.replace(/\/+$/, "");
}

const supabaseUrl = rawUrl;
const supabaseAnonKey = ((import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "").trim();

export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.includes("supabase.co")
);

if (typeof window !== "undefined") {
  console.log("[Supabase Status]", {
    configured: isSupabaseConfigured,
    url: supabaseUrl,
    keyPresent: Boolean(supabaseAnonKey),
  });
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;