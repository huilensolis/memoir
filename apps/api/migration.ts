import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./src/config/database";

await migrate(db, { migrationsFolder: "./src/config/database/migrations" });
