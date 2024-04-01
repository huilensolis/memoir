import { Users } from "@/features/user/schema";
import {
  pgTable,
  integer,
  date,
  text,
  varchar,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

export const JournalEntries = pgTable("journal_entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => Users.id)
    .notNull(),
  title: varchar("title", { length: 80 }).default("Untintled"),
  createdAt: date("date").notNull(),
  updatedAt: date("date").notNull(),
  wordCount: integer("word_count").default(0),
  content: text("content").default(JSON.stringify({})),
  private: boolean("private").default(false),
  end_date: date("end_date"),
});
