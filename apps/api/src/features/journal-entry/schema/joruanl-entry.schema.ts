import { Users } from "@/features/user/schema";
import {
  pgTable,
  integer,
  varchar,
  boolean,
  uuid,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const JournalEntries = pgTable("journal_entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => Users.id)
    .notNull(),
  title: varchar("title", { length: 80 }).default("Untintled"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
  word_count: integer("word_count").default(0),
  content: json("content"),
  private: boolean("private").default(false),
  end_date: timestamp("end_date"),
});
