import { Static, t } from "elysia";
import { JournalEntries } from "../schema";

export type TReadJournalEntry = typeof JournalEntries.$inferSelect;
export type TNewJournalEntry = typeof JournalEntries.$inferInsert;

export const JournalEntryInsertSchema = t.Object({
  title: t.Optional(t.String({ maxLength: 80 }), true),
  content: t.Optional(t.Object({}), true),
  word_count: t.Optional(t.Number(), true),
});

export type TJournalEntryInsert = Static<typeof JournalEntryInsertSchema>;

export const JournalEntrySafeSchema = t.Object({
  id: t.String(),
  title: t.Nullable(t.String({ maxLength: 80 })),
  content: t.Nullable(t.Object({})),
  word_count: t.Nullable(t.Number()),
  created_at: t.Date(),
  updated_at: t.Date(),
  end_date: t.Nullable(t.Date()),
});

export type TJournalEntrySafe = Static<typeof JournalEntrySafeSchema>;
