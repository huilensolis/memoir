import { t } from "elysia";
import { JournalEntries } from "../schema";

export type ReadJournalEntry = typeof JournalEntries.$inferSelect;
export type NewJournalEntry = typeof JournalEntries.$inferInsert;

enum EMood {
  happy = "happy",
  ok = "ok",
  sad = "sad",
  angry = "angry",
}

export const JournalEntryInsertSchema = t.Object({
  title: t.Optional(t.String({ maxLength: 80 }), true),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  content: t.Object({}),
  mood: t.Enum(EMood),
  wordCount: t.Optional(t.Number(), true),
});

export const JournalEntryReadSchema = t.Object({
  id: t.Number(),
  userId: t.Number(),
  title: t.String({ maxLength: 80 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  content: t.Object({}),
  mood: t.Enum(EMood),
  wordCount: t.Optional(t.Number(), true),
  private: t.Boolean(),
  end_date: t.Nullable(t.Date()),
});
