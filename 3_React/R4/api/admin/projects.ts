import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db.js";
import { verifyAdminToken } from "../auth_helper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (!verifyAdminToken(req)) {
      return res.status(401).json({ success: false, error: "No autorizado. Inicia sesión como administrador." });
    }

    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error("Failed to parse body string:", e);
      }
    }

    if (req.method === "POST" || req.method === "PUT") {
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
      } = body || {};

      if (!title || !shortDescription || !imageUrl) {
        return res.status(400).json({
          success: false,
          error: "Título (nombre), detalle (descripción) e imagen de portada son requeridos.",
        });
      }

      const projId = id || `proj_${Date.now()}`;

      await db.execute({
        sql: `INSERT INTO projects (
                id, title, shortDescription, longDescription, imageUrl,
                demoUrl, repoUrl, featured, display_order, startDate,
                endDate, tagIds, screenshots
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(id) DO UPDATE SET
                title = excluded.title,
                shortDescription = excluded.shortDescription,
                longDescription = excluded.longDescription,
                imageUrl = excluded.imageUrl,
                demoUrl = excluded.demoUrl,
                repoUrl = excluded.repoUrl,
                featured = excluded.featured,
                display_order = excluded.display_order,
                startDate = excluded.startDate,
                endDate = excluded.endDate,
                tagIds = excluded.tagIds,
                screenshots = excluded.screenshots`,
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

      return res.status(200).json({
        success: true,
        message: req.method === "PUT" ? "Proyecto actualizado con éxito." : "Proyecto guardado con éxito.",
        id: projId,
      });
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
