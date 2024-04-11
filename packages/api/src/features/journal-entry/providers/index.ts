import { db } from "@/config/database";
import { JournalEntry } from "../schema";
import { and, eq, ilike } from "drizzle-orm";
import { TReturnHanler } from "@/shared/models/promises";
import {
  TInsertJournalEntry,
  TNewJournalEntry,
  TReadJournalEntry,
} from "../models/joruanl-entry.models";

export class JournalEntryProvider {
  static async getPrivateEntryById({
    entryId,
    userId,
  }: {
    entryId: string;
    userId: string;
  }): Promise<TReadJournalEntry | undefined> {
    const [journalEntry] = await db
      .select()
      .from(JournalEntry)
      .where(
        and(eq(JournalEntry.id, entryId), eq(JournalEntry.user_id, userId)),
      );

    return journalEntry;
  }

  static async getPublicEntryById({
    entryId,
  }: {
    entryId: string;
  }): Promise<TReadJournalEntry | undefined> {
    const [journalEntry] = await db
      .select()
      .from(JournalEntry)
      .where(eq(JournalEntry.id, entryId));

    return journalEntry;
  }

  static async getEntriesListByUserId(
    userId: string,
  ): Promise<TReadJournalEntry[]> {
    const entries = await db
      .select()
      .from(JournalEntry)
      .where(eq(JournalEntry.user_id, userId));

    return entries;
  }

  static async getPrivateEntryListByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<TReadJournalEntry[]> {
    const journalEntries = await db
      .select()
      .from(JournalEntry)
      .where(
        and(ilike(JournalEntry.title, title), eq(JournalEntry.user_id, userId)),
      );

    return journalEntries;
  }

  static async createEntry({
    entry,
    userId,
  }: {
    entry: TInsertJournalEntry;
    userId: TReadJournalEntry["user_id"];
  }): Promise<TReturnHanler<TReadJournalEntry, string>> {
    const newEntryValues: TNewJournalEntry = {
      content: {},
      ...entry,
      user_id: userId,
    };

    try {
      const [newEntry] = await db
        .insert(JournalEntry)
        .values(newEntryValues)
        .returning();

      if (!newEntry) throw new Error("Failed to create journal entry");

      return { error: null, data: newEntry };
    } catch (error) {
      return { error: "error creating new entry", data: null };
    }
  }

  static async deleteEntry({
    entryId,
    userId,
  }: {
    entryId: string;
    userId: string;
  }): Promise<{ error: string | null }> {
    try {
      await db
        .update(JournalEntry)
        .set({ end_date: new Date() })
        .where(
          and(eq(JournalEntry.id, entryId), eq(JournalEntry.user_id, userId)),
        );
      return { error: null };
    } catch (error) {
      return { error: "unknown" };
    }
  }
}
