import { migrate } from "drizzle-orm/postgres-js/migrator";

import { Environment } from "@/config/environment";
import { db } from "../src/config/database";

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
