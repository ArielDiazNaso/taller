import { getDb } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, message: 'No autorizado' }, { status: 401 });
  }

  try {
    const db = getDb();
    const result = await db.execute(
      'SELECT id, name, email, image, role, status, provider, first_name, last_name, created_at FROM users ORDER BY id ASC'
    );
    return Response.json({ success: true, data: result.rows });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
