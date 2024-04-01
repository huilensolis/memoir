import { db } from "@/config/database";
import { JournalEntries } from "../schema";
import { and, eq, ilike } from "drizzle-orm";
import { ReadJournalEntry } from "../models/joruanl-entry.models";

export class JournalEntryProvider {
  async getPrivateEntryById({
    entryId,
    userId,
  }: {
    entryId: number;
    userId: number;
  }): Promise<ReadJournalEntry | undefined> {
    const [journalEntry] = await db
      .select()
      .from(JournalEntries)
      .where(
        and(eq(JournalEntries.id, entryId), eq(JournalEntries.userId, userId)),
      );

    return journalEntry;
  }

  async getPublicEntryById({
    entryId,
  }: {
    entryId: number;
  }): Promise<ReadJournalEntry | undefined> {
    const [journalEntry] = await db
      .select()
      .from(JournalEntries)
      .where(eq(JournalEntries.id, entryId));

    return journalEntry;
  }

  async getEntriesListByUserId(userId: number): Promise<ReadJournalEntry[]> {
    const entries = await db
      .select()
      .from(JournalEntries)
      .where(eq(JournalEntries.userId, userId));

    return entries;
  }

  async getPrivateEntryListByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: number;
  }): Promise<ReadJournalEntry[]> {
    const journalEntries = await db
      .select()
      .from(JournalEntries)
      .where(
        and(
          ilike(JournalEntries.title, title),
          eq(JournalEntries.userId, userId),
        ),
      );

    return journalEntries;
  }
}
