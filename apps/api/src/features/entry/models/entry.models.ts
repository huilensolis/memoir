import { type Static, t } from "elysia";
import type { Entry } from "../schema";

export type TReadEntry = typeof Entry.$inferSelect;
export type TNewEntry = typeof Entry.$inferInsert;

export const EntryInsertSchema = t.Partial(
  t.Object({
    title: t.String({ maxLength: 80 }),
    content: t.Object({
      type: t.String(),
      content: t.Array(t.Record(t.String(), t.Any())),
    }),
    word_count: t.Number(),
    iv: t.String({ pattern: "^[A-Za-z0-9+/]+={0,2}$" }),
  }),
);

export type TInsertEntry = Static<typeof EntryInsertSchema>;

export const EntrySafeSchema = t.Object({
  id: t.String(),
  title: t.String({ maxLength: 80 }),
  content: t.Nullable(
    t.Object({
      type: t.String(),
      content: t.Array(t.Record(t.String(), t.Any())),
    }),
  ),
  word_count: t.Number(),
  iv: t.String({ pattern: "^[A-Za-z0-9+/]+={0,2}$" }),
  created_at: t.Date(),
  updated_at: t.Date(),
  end_date: t.Nullable(t.Date()),
});

export type TEntrySafe = Static<typeof EntrySafeSchema>;
