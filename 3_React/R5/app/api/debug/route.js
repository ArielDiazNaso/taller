import { getDb, initDb } from '@/lib/db';

export async function GET() {
  const envStatus = {
    hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
    hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'missing',
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
    hasFacebookId: !!process.env.FACEBOOK_CLIENT_ID,
    hasGithubId: !!process.env.GITHUB_CLIENT_ID,
    nodeEnv: process.env.NODE_ENV,
  };

  let dbStatus = 'untested';
  let dbError = null;

  try {
    await initDb();
    const db = getDb();
    await db.execute('SELECT 1');
    dbStatus = 'connected';
  } catch (err) {
    dbStatus = 'error';
    dbError = err.message;
  }

  return Response.json({
    timestamp: new Date().toISOString(),
    env: envStatus,
    db: { status: dbStatus, error: dbError }
  });
}
