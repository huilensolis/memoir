import { drizzle as drizzlePostgresJs } from "drizzle-orm/postgres-js";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
import { Environment } from "../environment";
import postgres from "postgres";
import { Client } from "pg";

function getDb() {
  if (Environment.NODE_ENV === "production") {
    // this set up is for supabase datbase, so we disable prepare, since transaction mode doesnt support it
    const client = postgres(Environment.DATABASE_URL, { prepare: false });

    return drizzlePostgresJs<typeof schema>(client, { schema });
  }

  const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: Environment.POSTGRES_USER,
    password: Environment.POSTGRES_PASSWORD,
    database: Environment.POSTGRES_DATABASE,
  });

  return drizzleNode<typeof schema>(client, { schema });
}

const db = getDb();

export { db };
