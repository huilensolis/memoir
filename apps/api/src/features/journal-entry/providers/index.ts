import { db } from "@/config/database";
import { JournalEntries } from "../schema";
import { and, eq, ilike } from "drizzle-orm";
import {
  JournalEntryInsert,
  JournalEntryReadSchema,
  NewJournalEntry,
  ReadJournalEntry,
} from "../models/joruanl-entry.models";

export class JournalEntryProvider {
  static async getPrivateEntryById({
    entryId,
    userId,
  }: {
    entryId: string;
    userId: string;
  }): Promise<ReadJournalEntry | undefined> {
    const [journalEntry] = await db
      .select()
      .from(JournalEntries)
      .where(
        and(eq(JournalEntries.id, entryId), eq(JournalEntries.userId, userId)),
      );

    return journalEntry;
  }

  static async getPublicEntryById({
    entryId,
  }: {
    entryId: string;
  }): Promise<ReadJournalEntry | undefined> {
    const [journalEntry] = await db
      .select()
      .from(JournalEntries)
      .where(eq(JournalEntries.id, entryId));

    return journalEntry;
  }

  static async getEntriesListByUserId(
    userId: string,
  ): Promise<ReadJournalEntry[]> {
    const entries = await db
      .select()
      .from(JournalEntries)
      .where(eq(JournalEntries.userId, userId));

    return entries;
  }

  static async getPrivateEntryListByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
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

  static async createEntry({
    entry,
    userId,
  }: {
    entry: JournalEntryInsert;
    userId: ReadJournalEntry["userId"];
  }): Promise<{
    error: null | string;
  }> {
    const newEntry: NewJournalEntry = {
      ...entry,
      content: entry.content
        ? JSON.stringify(entry.content)
        : JSON.stringify({}),
      userId,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    try {
      await db.insert(JournalEntries).values(newEntry);

      return { error: null };
    } catch (error) {
      return { error: "error creating journal entry" };
    }
  }
}
