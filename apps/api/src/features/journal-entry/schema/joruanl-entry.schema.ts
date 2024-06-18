import { Users } from "@/features/user/schema";
import {
  boolean,
  integer,
  json,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export type TDocType = "doc";

export type TDocumentContent = {
  type: TDocType | string;
  content: Record<string, unknown>[];
};

export const JournalEntry = pgTable("journal_entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  title: varchar("title", { length: 80 }).default("Untintled").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  word_count: integer("word_count").default(0).notNull(),
  content: json("content")
    .default({
      type: "doc",
      content: [
        {
          type: "paragraph",
        },
      ],
    })
    .$type<TDocumentContent>(),
  is_private: boolean("is_private").default(false).notNull(),
  end_date: timestamp("end_date"),
});
