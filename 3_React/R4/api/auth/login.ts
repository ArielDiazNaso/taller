import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_portfolio_key_2026";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { password } = req.body || {};

    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ success: false, error: "ADMIN_PASSWORD no configurado en el servidor." });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, error: "Contraseña incorrecta" });
    }

    // Generate JWT token valid for 7 days
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      success: true,
      token,
      message: "Autenticado correctamente",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error durante login";
    return res.status(500).json({ success: false, error: msg });
  }
}
