import { Static, t } from "elysia";
import { JournalEntry } from "../schema";

export type TReadJournalEntry = typeof JournalEntry.$inferSelect;
export type TNewJournalEntry = typeof JournalEntry.$inferInsert;

export const JournalEntryInsertSchema = t.Object({
  title: t.Optional(t.String({ maxLength: 80 }), true),
  content: t.Optional(t.Array(t.Record(t.String(), t.Unknown())), true),
  word_count: t.Optional(t.Number(), true),
});

export type TInsertJournalEntry = Static<typeof JournalEntryInsertSchema>;

export const JournalEntrySafeSchema = t.Object({
  id: t.String(),
  title: t.String({ maxLength: 80 }),
  content: t.Nullable(t.Array(t.Record(t.String(), t.Unknown()))),
  word_count: t.Number(),
  created_at: t.String(),
  updated_at: t.String(),
  end_date: t.Nullable(t.String()),
});

export type TJournalEntrySafe = Static<typeof JournalEntrySafeSchema>;
