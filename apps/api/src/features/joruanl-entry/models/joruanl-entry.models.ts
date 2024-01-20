import { JournalEntries } from "../schema";

export type JournalEntry = typeof JournalEntries.$inferSelect;
export type NewJournalEntry = typeof JournalEntries.$inferInsert;
