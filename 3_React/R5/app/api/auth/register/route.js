import { getDb, initDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

let dbReady = false;
async function ensureDb() {
  if (!dbReady) {
    try { await initDb(); dbReady = true; } catch (e) { console.error('[Register] DB init error:', e.message); }
  }
}

export async function POST(request) {
  await ensureDb();

  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ success: false, message: 'Email y contraseña son obligatorios' }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }

    const db = getDb();
    const emailClean = email.toLowerCase().trim();

    const existing = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: [emailClean] });
    if (existing.rows.length > 0) {
      return Response.json({ success: false, message: 'El correo electrónico ya está registrado' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userName = name?.trim() || emailClean.split('@')[0];

    const result = await db.execute({
      sql: `INSERT INTO users (name, email, password_hash, role, status, provider)
            VALUES (?, ?, ?, 'ADMIN', 'ACTIVE', 'credentials')
            RETURNING id, name, email, role, status`,
      args: [userName, emailClean, passwordHash],
    });

    return Response.json({ success: true, message: 'Cuenta creada exitosamente', user: result.rows[0] });
  } catch (err) {
    console.error('[Register] Error:', err);
    return Response.json({ success: false, message: err.message || 'Error en el servidor' }, { status: 500 });
  }
}
