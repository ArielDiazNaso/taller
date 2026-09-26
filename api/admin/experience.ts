import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db.js";
import { verifyAdminToken } from "../auth_helper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!verifyAdminToken(req)) {
    return res.status(401).json({ success: false, error: "No autorizado. Inicia sesión como administrador." });
  }

  try {
    if (req.method === "POST") {
      const {
        id,
        title,
        institution,
        type,
        startDate,
        endDate,
        description,
        bulletPoints,
        order,
        location,
        relatedSkillsIds,
      } = req.body || {};

      const expId = id || `exp_${Date.now()}`;

      await db.execute({
        sql: `INSERT INTO experience (id, title, institution, type, startDate, endDate, description, bulletPoints, display_order, location, relatedSkillsIds)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          expId,
          title || "Título / Carrera",
          institution || "Institución",
          type || "education",
          startDate || "2024",
          endDate || null,
          description || "",
          typeof bulletPoints === "string" ? bulletPoints : JSON.stringify(bulletPoints || []),
          order ?? 99,
          location || null,
          typeof relatedSkillsIds === "string" ? relatedSkillsIds : JSON.stringify(relatedSkillsIds || []),
        ],
      });

      return res.status(201).json({ success: true, message: "Experiencia agregada con éxito." });
    }

    if (req.method === "PUT") {
      const {
        id,
        title,
        institution,
        type,
        startDate,
        endDate,
        description,
        bulletPoints,
        order,
        location,
        relatedSkillsIds,
      } = req.body || {};

      if (!id) {
        return res.status(400).json({ success: false, error: "ID requerido para actualizar." });
      }

      await db.execute({
        sql: `UPDATE experience SET
                title = ?,
                institution = ?,
                type = ?,
                startDate = ?,
                endDate = ?,
                description = ?,
                bulletPoints = ?,
                display_order = ?,
                location = ?,
                relatedSkillsIds = ?
              WHERE id = ?`,
        args: [
          title || "",
          institution || "",
          type || "work",
          startDate || "",
          endDate || null,
          description || "",
          typeof bulletPoints === "string" ? bulletPoints : JSON.stringify(bulletPoints || []),
          order ?? 1,
          location || null,
          typeof relatedSkillsIds === "string" ? relatedSkillsIds : JSON.stringify(relatedSkillsIds || []),
          id,
        ],
      });

      return res.status(200).json({ success: true, message: "Experiencia actualizada con éxito." });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ success: false, error: "ID requerido para eliminar." });
      }

      await db.execute({
        sql: "DELETE FROM experience WHERE id = ?",
        args: [id],
      });

      return res.status(200).json({ success: true, message: "Experiencia eliminada con éxito." });
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Admin Experience Error:", error);
    const msg = error instanceof Error ? error.message : "Error al procesar experiencia";
    return res.status(500).json({ success: false, error: msg });
  }
}
