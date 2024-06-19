import { db } from "@/config/database";
import { Entry } from "@/features/entry/schema";
import cron from "@elysiajs/cron";
import { eq, isNotNull } from "drizzle-orm";
import type Elysia from "elysia";

export const pluginCronCleanDeletedEntries = (app: Elysia) =>
  app.use(
    cron({
      pattern: "@daily",
      name: "clean-deleted-entries",
      async run(store) {
        const deletedEntries = await db
          .select()
          .from(Entry)
          .where(isNotNull(Entry.end_date));
        if (!deletedEntries.length || deletedEntries.length === 0) return;

        const today = new Date();

        for await (const deletedEntry of deletedEntries) {
          if (
            deletedEntry.end_date !== null &&
            deletedEntry.end_date.getTime() < today.getTime()
          ) {
            try {
              await db.delete(Entry).where(eq(Entry.id, deletedEntry.id));
            } catch (error) {
              console.log("could not delete entry with id:", deletedEntry.id);
            }
          }
        }
      },
    }),
  );
