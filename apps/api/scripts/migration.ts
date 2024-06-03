import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from "../src/config/database";
import { Environment } from "@/config/environment";

await (async () => {
  console.log("running migration script");
  console.log(Environment.NODE_ENV);

  try {
    await migrate(db, {
      migrationsFolder: "./src/config/database/migrations",
    });

    console.log("migration completed successfully");

    process.exit(0);
  } catch (error) {
    return Promise.reject({
      message: "error generating shcema migration",
      error,
    });
  }
})();
