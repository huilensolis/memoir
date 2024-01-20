import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "memoir_user",
  password: "memoir_password",
  database: "memoir_db",
});

await pool.connect();
const db = drizzle(pool);

export { db };
