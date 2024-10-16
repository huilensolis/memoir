import { type Static, t } from "elysia";
import type { Entry } from "../schema";

export type TReadEntry = typeof Entry.$inferSelect;
export type TNewEntry = typeof Entry.$inferInsert;

const EncryptedEntryInsertSchema = t.Object({
	data: t.String({
		pattern: "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$",
	}),
	iv: t.String({ pattern: "^[A-Za-z0-9+/]+={0,2}$" }),
});

export type TEntryInsertSchema = Static<typeof EncryptedEntryInsertSchema>;

export const EntryInsertSchema = EncryptedEntryInsertSchema;

export type TInsertEntry = Static<typeof EntryInsertSchema>;

export const EntrySafeSchema = t.Object({
	id: t.String(),
	...EncryptedEntryInsertSchema.properties,
	created_at: t.Date(),
	updated_at: t.Date(),
	end_date: t.Nullable(t.Date()),
});

export type TEntrySafe = Static<typeof EntrySafeSchema>;
