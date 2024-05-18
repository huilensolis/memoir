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

export const JournalEntry = pgTable("journal_entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  title: varchar("title", { length: 80 }).default("Untintled"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  word_count: integer("word_count").default(0),
  content: json("content").default([]).$type<Record<string, unknown>[]>(),
  is_private: boolean("is_private").default(false),
  end_date: timestamp("end_date"),
});
