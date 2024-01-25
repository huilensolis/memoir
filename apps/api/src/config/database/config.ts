import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "memoir_user",
  password: "memoir_password",
  database: "memoir_db",
});

await pool.connect();
const db = drizzle<typeof schema>(pool, { schema });

export { db };
