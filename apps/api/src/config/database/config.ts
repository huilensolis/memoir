import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schema";
import { Environment } from "../environment";

const client = new Client({
  ...(Environment.NODE_ENV === "development"
    ? { connectionString: Environment.DATABASE_URL }
    : {
        host: "127.0.0.1",
        port: 5432,
        user: Environment.POSTGRES_USER,
        password: Environment.POSTGRES_PASSWORD,
        database: Environment.POSTGRES_DATABASE,
      }),
});

await client.connect();
const db = drizzle<typeof schema>(client, { schema });

export { db };
