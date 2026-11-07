import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getDb, initDb } from './db';

let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    try {
      await initDb();
      dbInitialized = true;
    } catch (e) {
      console.error('[NextAuth] Error inicializando DB:', e.message);
    }
  }
}

// Helper para sincronizar usuario OAuth con la DB Turso
async function syncOAuthUser({ user, account, profile }) {
  await ensureDb();
  const db = getDb();
  
  const email = user.email || (profile && profile.email) || `${account.provider}_${account.providerAccountId}@placeholder.local`;
  const name = user.name || profile?.name || profile?.login || 'Usuario';
  const image = user.image || profile?.avatar_url || profile?.picture || null;

  try {
    // 1. Buscar si ya existe la cuenta vinculada
    const accResult = await db.execute({
      sql: `SELECT u.* FROM users u JOIN accounts a ON u.id = a.user_id 
            WHERE a.provider = ? AND a.provider_account_id = ?`,
      args: [account.provider, String(account.providerAccountId)]
    });

    if (accResult.rows.length > 0) {
      return accResult.rows[0];
    }

    // 2. Si no está vinculada, buscar si ya existe el usuario por email
    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    let dbUserId;
    let dbUser;

    if (userResult.rows.length > 0) {
      dbUser = userResult.rows[0];
      dbUserId = dbUser.id;
    } else {
      // 3. Crear usuario nuevo
      const insertUser = await db.execute({
        sql: `INSERT INTO users (name, email, email_verified, image, role, status, provider)
              VALUES (?, ?, 1, ?, 'ADMIN', 'ACTIVE', ?)
              RETURNING *`,
        args: [name, email, image, account.provider]
      });
      dbUser = insertUser.rows[0];
      dbUserId = dbUser.id;
    }

    // 4. Vincular la cuenta
    await db.execute({
      sql: `INSERT OR REPLACE INTO accounts 
            (user_id, type, provider, provider_account_id, access_token, token_type, scope, id_token)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        Number(dbUserId),
        account.type || 'oauth',
        account.provider,
        String(account.providerAccountId),
        account.access_token ?? null,
        account.token_type ?? null,
        account.scope ?? null,
        account.id_token ?? null
      ]
    });

    return dbUser;
  } catch (err) {
    console.error('[NextAuth] Error vinculando cuenta OAuth:', err);
    throw err;
  }
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      await ensureDb();
      if (!credentials?.email || !credentials?.password) return null;

      try {
        const db = getDb();
        const result = await db.execute({
          sql: 'SELECT * FROM users WHERE email = ?',
          args: [credentials.email.toLowerCase().trim()],
        });

        const user = result.rows[0];
        if (!user) return null;
        if (!user.password_hash) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || 'ADMIN',
          status: user.status || 'ACTIVE',
          provider: 'credentials',
        };
      } catch (err) {
        console.error('[NextAuth] authorize error:', err);
        return null;
      }
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(GoogleProvider({ 
    clientId: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true 
  }));
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(FacebookProvider({ 
    clientId: process.env.FACEBOOK_CLIENT_ID, 
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
    authorization: {
      params: {
        scope: 'public_profile',
      }
    }
  }));
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(GitHubProvider({ 
    clientId: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true
  }));
}

export const authOptions = {
  // Sin adapter rígido para evitar el rechazo de NextAuth en OAuthCallback
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider && account.provider !== 'credentials') {
        try {
          const dbUser = await syncOAuthUser({ user, account, profile });
          if (dbUser) {
            user.id = String(dbUser.id);
            user.role = dbUser.role || 'ADMIN';
            user.status = dbUser.status || 'ACTIVE';
            return true;
          }
        } catch (e) {
          console.error('[NextAuth] signIn callback error:', e);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'ADMIN';
        token.status = user.status || 'ACTIVE';
        token.provider = account?.provider || user.provider || 'credentials';
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id;
        session.user.role = token.role ?? 'ADMIN';
        session.user.status = token.status ?? 'ACTIVE';
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  debug: false,
};
