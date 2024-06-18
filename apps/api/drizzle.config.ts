import type { Config } from "drizzle-kit";
export default {
	dialect: "postgresql",
	schema: "./src/config/database/schema.ts",
	out: "./src/config/database/migrations",
} satisfies Config;
