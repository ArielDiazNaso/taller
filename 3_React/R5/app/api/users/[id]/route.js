import { getDb } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, message: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, role, status } = body;
    const db = getDb();

    await db.execute({
      sql: `UPDATE users SET name=COALESCE(?,name), email=COALESCE(?,email),
            role=COALESCE(?,role), status=COALESCE(?,status), updated_at=datetime('now') WHERE id=?`,
      args: [name ?? null, email ?? null, role ?? null, status ?? null, Number(id)],
    });

    return Response.json({ success: true, message: 'Usuario actualizado' });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, message: 'No autorizado' }, { status: 401 });
  }

  try {
    const db = getDb();
    await db.execute({ sql: 'DELETE FROM users WHERE id = ?', args: [Number(params.id)] });
    return Response.json({ success: true, message: 'Usuario eliminado' });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
