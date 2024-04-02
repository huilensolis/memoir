import { Static, t } from "elysia";
import { JournalEntries } from "../schema";

export type ReadJournalEntry = typeof JournalEntries.$inferSelect;
export type NewJournalEntry = typeof JournalEntries.$inferInsert;

export const JournalEntryInsertSchema = t.Object({
  title: t.Optional(t.String({ maxLength: 80 }), true),
  content: t.Optional(t.Object({}), true),
  word_count: t.Optional(t.Number(), true),
});

export type JournalEntryInsert = Static<typeof JournalEntryInsertSchema>;

export const JournalEntryReadSchema = t.Object({
  id: t.String(),
  user_id: t.String(),
  title: t.Optional(t.String({ maxLength: 80 }), true),
  content: t.Optional(t.Object({}), true),
  word_count: t.Optional(t.Number(), true),
  created_at: t.Number(),
  updated_at: t.Number(),
  private: t.Boolean(),
  end_date: t.Nullable(t.Date()),
});
