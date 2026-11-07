import { initDb, getDb } from './lib/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  try {
    await initDb();
    console.log('DB init ok');
    
    // Check if table accounts exists and describe it
    const db = getDb();
    const r = await db.execute("PRAGMA table_info(accounts);");
    console.log(r.rows);
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
