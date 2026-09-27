import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db.js";
import { verifyAdminToken } from "../auth_helper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!verifyAdminToken(req)) {
    return res.status(401).json({ success: false, error: "No autorizado. Inicia sesión como administrador." });
  }

  try {
    const {
      id,
      firstName,
      lastName,
      title,
      tagline,
      bio,
      avatarUrl,
      email,
      phone,
      location,
      resumeUrl,
      socials,
      highlights,
    } = req.body || {};

    if (!firstName || !lastName || !title) {
      return res.status(400).json({ success: false, error: "Faltan campos obligatorios (nombre, apellido, título)." });
    }

    await db.execute({
      sql: `UPDATE profile SET
              firstName = ?,
              lastName = ?,
              title = ?,
              tagline = ?,
              bio = ?,
              avatarUrl = ?,
              email = ?,
              phone = ?,
              location = ?,
              resumeUrl = ?,
              socials = ?,
              highlights = ?
            WHERE id = ?`,
      args: [
        firstName,
        lastName,
        title,
        tagline || "",
        bio || "",
        avatarUrl || "/avatar.png",
        email || "",
        phone || null,
        location || "",
        resumeUrl || null,
        typeof socials === "string" ? socials : JSON.stringify(socials || []),
        typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        id || "user_01",
      ],
    });

    return res.status(200).json({ success: true, message: "Perfil actualizado con éxito." });
  } catch (error) {
    console.error("Admin Profile Update Error:", error);
    const msg = error instanceof Error ? error.message : "Error al actualizar perfil";
    return res.status(500).json({ success: false, error: msg });
  }
}
