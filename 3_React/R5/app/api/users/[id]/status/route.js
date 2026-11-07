import { getDb } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, message: 'No autorizado' }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    const db = getDb();
    await db.execute({
      sql: `UPDATE users SET status=?, updated_at=datetime('now') WHERE id=?`,
      args: [status, Number(params.id)],
    });
    return Response.json({ success: true, data: { id: Number(params.id), status } });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
