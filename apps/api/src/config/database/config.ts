import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

import * as schema from "./schema";
import { Environment } from "../environment";
import { sql } from "drizzle-orm";

/**
 *
 * @return a drizzle conenction with postgeresJs if the environment is production,
 * otherwise it returns a drizzle connection with node postgres
 *
 */
async function getDb() {
  if (Environment.NODE_ENV === "production") {
    // this set up is for supabase datbase, so we disable prepare, since transaction mode doesnt support it
    const client = postgres(Environment.DATABASE_URL, { prepare: false });

    const db = drizzle<typeof schema>(client, { schema });

    return db;
  }

  const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DATABASE } = Environment;

  const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:5432/${POSTGRES_DATABASE}`;
  const client = postgres(connectionString, { prepare: false });

  const db = drizzle<typeof schema>(client, { schema });

  return db;
}

const db = await getDb();

export { db };
