import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import cron from "@elysiajs/cron";
import { eq, isNotNull } from "drizzle-orm";
import type { Elysia } from "elysia";

export const pluginCronCleanInactiveUsers = (app: Elysia) => {
	return app.use(
		cron({
			name: "clean-inactive-users",
			pattern: "@daily",
			async run(cronStore) {
				const inactiveUsers = await db
					.select()
					.from(Users)
					.where(isNotNull(Users.end_date));

				if (!inactiveUsers.length || inactiveUsers.length === 0) return;

				const today = new Date();
				for await (const inactiveUser of inactiveUsers) {
					if (
						inactiveUser.end_date !== null &&
						today.getTime() <= new Date(inactiveUser.end_date).getTime()
					)
						try {
							await db.delete(Users).where(eq(Users.id, inactiveUser.id));
						} catch (error) {
							console.log("could not delete user with id:", inactiveUser.id);
						}
				}
			},
		}),
	);
};
