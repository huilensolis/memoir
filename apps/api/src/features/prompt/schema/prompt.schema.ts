import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Prompts = pgTable("propmts", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 255 }).notNull(),
});
