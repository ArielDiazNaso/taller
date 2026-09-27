import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const profileRes = await db.execute("SELECT * FROM profile LIMIT 1");
    const skillsRes = await db.execute("SELECT * FROM skills");
    const experienceRes = await db.execute("SELECT * FROM experience ORDER BY display_order ASC");
    const projectsRes = await db.execute("SELECT * FROM projects ORDER BY display_order ASC");
    const tagsRes = await db.execute("SELECT * FROM project_tags");

    const rawProfile = profileRes.rows[0];
    if (!rawProfile) {
      return res.status(404).json({ success: false, error: "Profile not found" });
    }

    const profile = {
      ...rawProfile,
      socials: typeof rawProfile.socials === "string" ? JSON.parse(rawProfile.socials) : rawProfile.socials,
      highlights: typeof rawProfile.highlights === "string" ? JSON.parse(rawProfile.highlights) : rawProfile.highlights,
    };

    const skills = skillsRes.rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      proficiency: Number(row.proficiency),
      iconKey: row.iconKey,
      yearsOfExperience: Number(row.yearsOfExperience),
    }));

    const experience = experienceRes.rows.map((row) => ({
      id: row.id,
      title: row.title,
      institution: row.institution,
      type: row.type,
      startDate: row.startDate,
      endDate: row.endDate || null,
      description: row.description,
      bulletPoints: typeof row.bulletPoints === "string" ? JSON.parse(row.bulletPoints) : [],
      order: Number(row.display_order),
      location: row.location || null,
      relatedSkillsIds: typeof row.relatedSkillsIds === "string" ? JSON.parse(row.relatedSkillsIds) : [],
    }));

    const projects = projectsRes.rows.map((row) => ({
      id: row.id,
      title: row.title,
      shortDescription: row.shortDescription,
      longDescription: row.longDescription,
      imageUrl: row.imageUrl,
      demoUrl: row.demoUrl || null,
      repoUrl: row.repoUrl || null,
      featured: Boolean(row.featured),
      order: Number(row.display_order),
      startDate: row.startDate || null,
      endDate: row.endDate || null,
      tagIds: typeof row.tagIds === "string" ? JSON.parse(row.tagIds) : [],
      screenshots: typeof row.screenshots === "string" ? JSON.parse(row.screenshots) : [],
    }));

    const projectTags = tagsRes.rows.map((row) => ({
      id: row.id,
      name: row.name,
      color: row.color,
    }));

    return res.status(200).json({
      success: true,
      data: {
        profile,
        skills,
        experience,
        projects,
        projectTags,
      },
    });
  } catch (error) {
    console.error("API Portfolio Error:", error);
    const msg = error instanceof Error ? error.message : "Error fetching portfolio";
    return res.status(500).json({ success: false, error: msg });
  }
}
