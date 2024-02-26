import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";
import { Environment } from "../environment";

const pool = new Pool({
	host: "127.0.0.1",
	port: 5432,
	user: Environment.POSTGRES_USER,
	password: Environment.POSTGRES_PASSWORD,
	database: Environment.POSTGRES_DATABASE,
});

await pool.connect();
const db = drizzle<typeof schema>(pool, { schema });

export { db };
