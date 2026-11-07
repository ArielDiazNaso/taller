import { createClient } from '@libsql/client';

const url = 'libsql://registrousuarios-arieldiaznaso.aws-ap-south-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA1OTMyMTcsImlkIjoiMDFhMGU1NjUtZDEwMS03NzY0LTkxMzUtNWI2YTczOGI4YzhiIiwia2lkIjoiUWlOVGlQdjI1V0lLdHZKb0p2Q3BYQjI3Ql8wb0NhbDQwdmV1U2VEZDJlbyIsInJpZCI6ImU1ODcyZGM3LTc3MTctNGZlNy05YmVmLTVmNmY3MjMyOWM5OSJ9.w6eiwiVzgDPuLgOgFokeyQ70jV6yQolYChlfnz_iDzIoyv6_PM98mu5Ad3VWR4TvWdi2QB4q-KYt-Rm_3cxABg';

async function test() {
  try {
    const client = createClient({ url, authToken });
    const r1 = await client.execute('SELECT count(*) as count FROM users');
    console.log('Users count:', r1.rows);
    const r2 = await client.execute('SELECT * FROM users');
    console.log('Users:', r2.rows);
    const r3 = await client.execute('PRAGMA table_info(users)');
    console.log('Users columns:', r3.rows.map(c => c.name));
    const r4 = await client.execute('PRAGMA table_info(accounts)');
    console.log('Accounts columns:', r4.rows.map(c => c.name));
  } catch (e) {
    console.error('DB Error:', e);
  }
}

test();
