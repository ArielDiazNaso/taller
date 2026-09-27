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
        shortDescription,
        longDescription,
        imageUrl,
        demoUrl,
        repoUrl,
        featured,
        order,
        startDate,
        endDate,
        tagIds,
        screenshots,
      } = req.body || {};

      if (!title || !shortDescription || !imageUrl) {
        return res.status(400).json({
          success: false,
          error: "Título (nombre), detalle (descripción) e imagen son requeridos.",
        });
      }

      const projId = id || `proj_${Date.now()}`;

      await db.execute({
        sql: `INSERT INTO projects (
                id, title, shortDescription, longDescription, imageUrl,
                demoUrl, repoUrl, featured, display_order, startDate,
                endDate, tagIds, screenshots
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          projId,
          title,
          shortDescription,
          longDescription || shortDescription,
          imageUrl,
          demoUrl || null,
          repoUrl || null,
          featured ? 1 : 0,
          order ?? 1,
          startDate || new Date().getFullYear().toString(),
          endDate || null,
          typeof tagIds === "string" ? tagIds : JSON.stringify(tagIds || []),
          typeof screenshots === "string" ? screenshots : JSON.stringify(screenshots || []),
        ],
      });

      return res.status(201).json({ success: true, message: "Proyecto guardado con éxito.", id: projId });
    }

    if (req.method === "PUT") {
      const {
        id,
        title,
        shortDescription,
        longDescription,
        imageUrl,
        demoUrl,
        repoUrl,
        featured,
        order,
        startDate,
        endDate,
        tagIds,
        screenshots,
      } = req.body || {};

      if (!id) {
        return res.status(400).json({ success: false, error: "ID requerido para actualizar." });
      }

      await db.execute({
        sql: `UPDATE projects SET
                title = ?,
                shortDescription = ?,
                longDescription = ?,
                imageUrl = ?,
                demoUrl = ?,
                repoUrl = ?,
                featured = ?,
                display_order = ?,
                startDate = ?,
                endDate = ?,
                tagIds = ?,
                screenshots = ?
              WHERE id = ?`,
        args: [
          title || "",
          shortDescription || "",
          longDescription || shortDescription || "",
          imageUrl || "",
          demoUrl || null,
          repoUrl || null,
          featured ? 1 : 0,
          order ?? 1,
          startDate || null,
          endDate || null,
          typeof tagIds === "string" ? tagIds : JSON.stringify(tagIds || []),
          typeof screenshots === "string" ? screenshots : JSON.stringify(screenshots || []),
          id,
        ],
      });

      return res.status(200).json({ success: true, message: "Proyecto actualizado con éxito." });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ success: false, error: "ID requerido para eliminar." });
      }

      await db.execute({
        sql: "DELETE FROM projects WHERE id = ?",
        args: [id],
      });

      return res.status(200).json({ success: true, message: "Proyecto eliminado con éxito." });
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Admin Projects Error:", error);
    const msg = error instanceof Error ? error.message : "Error al procesar proyecto";
    return res.status(500).json({ success: false, error: msg });
  }
}
