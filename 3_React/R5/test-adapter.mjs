import { createClient } from '@libsql/client';

const url = 'libsql://registrousuarios-arieldiaznaso.aws-ap-south-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA1OTMyMTcsImlkIjoiMDFhMGU1NjUtZDEwMS03NzY0LTkxMzUtNWI2YTczOGI4YzhiIiwia2lkIjoiUWlOVGlQdjI1V0lLdHZKb0p2Q3BYQjI3Ql8wb0NhbDQwdmV1U2VEZDJlbyIsInJpZCI6ImU1ODcyZGM3LTc3MTctNGZlNy05YmVmLTVmNmY3MjMyOWM5OSJ9.w6eiwiVzgDPuLgOgFokeyQ70jV6yQolYChlfnz_iDzIoyv6_PM98mu5Ad3VWR4TvWdi2QB4q-KYt-Rm_3cxABg';

async function testInsert() {
  const client = createClient({ url, authToken });
  try {
    const res = await client.execute({
      sql: `INSERT INTO users (name, email, email_verified, image, role, provider)
            VALUES (?, ?, ?, ?, 'ADMIN', 'oauth')
            RETURNING *`,
      args: ['Test User', 'test' + Date.now() + '@test.com', 0, null]
    });
    console.log('Insert success:', res.rows[0]);
    
    // Test linkAccount
    const acc = await client.execute({
      sql: `INSERT OR REPLACE INTO accounts
            (user_id, type, provider, provider_account_id, refresh_token,
             access_token, expires_at, token_type, scope, id_token, session_state)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        Number(res.rows[0].id), 'oauth', 'google', '123456',
        null, 'access_token_abc', 1700000000,
        'Bearer', 'openid email profile', 'id_token_xyz', null
      ]
    });
    console.log('Account link success:', acc);
  } catch (e) {
    console.error('Error during adapter test:', e);
  }
}

testInsert();
