import { Users } from "@/features/user/schema";
import { varchar } from "drizzle-orm/mysql-core";
import { pgTable, serial, integer, date, text } from "drizzle-orm/pg-core";

export const JournalEntries = pgTable("journal_entry", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id),
  title: varchar("title", { length: 80 }),
  createdAt: date("date").notNull(),
  updatedAt: date("date").notNull(),
  wordCount: integer("word_count").notNull(),
  content: text("content").notNull(),
});
