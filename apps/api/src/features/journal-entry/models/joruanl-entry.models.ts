import { type Static, t } from "elysia";
import type { JournalEntry } from "../schema";

export type {
  TDocumentContent,
  TDocType,
} from "../schema/joruanl-entry.schema";

export type TReadJournalEntry = typeof JournalEntry.$inferSelect;
export type TNewJournalEntry = typeof JournalEntry.$inferInsert;

export const JournalEntryInsertSchema = t.Partial(
  t.Object({
    title: t.String({ maxLength: 80 }),
    content: t.Object({
      type: t.String(),
      content: t.Array(t.Record(t.String(), t.Any())),
    }),
    word_count: t.Number(),
  }),
);

export type TInsertJournalEntry = Static<typeof JournalEntryInsertSchema>;

export const JournalEntrySafeSchema = t.Object({
  id: t.String(),
  title: t.String({ maxLength: 80 }),
  content: t.Nullable(
    t.Object({
      type: t.String(),
      content: t.Array(t.Record(t.String(), t.Any())),
    }),
  ),
  word_count: t.Number(),
  created_at: t.Date(),
  updated_at: t.Date(),
  end_date: t.Nullable(t.Date()),
});

export type TJournalEntrySafe = Static<typeof JournalEntrySafeSchema>;
