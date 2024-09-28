import { bytea } from "@/config/database/custom-types";
import { Users } from "@/features/user/schema";
import {
  integer,
  json,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

type TDocumentContent = {
  type: "doc" | string;
  content: Record<string, unknown>[];
};

export const Entry = pgTable("entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  title: varchar("title", { length: 80 }).default("Untintled").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
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
  iv: bytea("iv"),
  end_date: timestamp("end_date"),
});
