import { pgTable, serial, integer, date, text } from "drizzle-orm/pg-core";
import { Users } from "../../user/schemas";

export const JournalEntries = pgTable("journal_entry", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => Users.id),
	date: date("date").notNull(),
	content: text("content").notNull(),
});
