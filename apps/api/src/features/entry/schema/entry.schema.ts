import { Users } from "@/features/user/schema";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const Entry = pgTable("entry", {
	id: uuid("id").primaryKey().defaultRandom(),
	user_id: uuid("user_id")
		.references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" })
		.notNull(),
	data: text("data").notNull(),
	iv: varchar("iv").notNull(),
	//
	//
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
	end_date: timestamp("end_date"),
});
