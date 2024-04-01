import { t } from "elysia";

enum EMood {
  happy = "happy",
  ok = "ok",
  sad = "sad",
  angry = "angry",
}

export const JournalEntryInsertScheme = t.Object({
  title: t.String({ maxLength: 80 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  content: t.Object({}),
  mood: t.Enum(EMood),
  wordCount: t.Number(),
});

export const JournalEntryReadSchema = t.Object({
  id: t.Number(),
  userId: t.Number(),
  title: t.String({ maxLength: 80 }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  content: t.Object({}),
  mood: t.Enum(EMood),
  wordCount: t.Number(),
});
