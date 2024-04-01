import { Users } from "@/features/user/schema";
import { boolean } from "drizzle-orm/mysql-core";
import {
  pgTable,
  serial,
  integer,
  date,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const JournalEntries = pgTable("journal_entry", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  title: varchar("title", { length: 80 }).default("Untintled"),
  createdAt: date("date").notNull(),
  updatedAt: date("date").notNull(),
  wordCount: integer("word_count").notNull(),
  content: text("content").notNull(),
  private: boolean("private").default(false),
  end_date: date("end_date").default(null),
});
