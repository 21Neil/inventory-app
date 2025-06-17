import { Pool } from 'pg';
import 'dotenv';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool
