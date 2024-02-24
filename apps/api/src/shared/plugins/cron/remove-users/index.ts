import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import cron from "@elysiajs/cron";
import { eq, isNotNull } from "drizzle-orm";
import { Elysia } from "elysia";

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

        if (inactiveUsers.length === 0) return;

        for await (const inactiveUser of inactiveUsers) {
          await db.delete(Users).where(eq(Users.id, inactiveUser.id));
        }
      },
    }),
  );
};
