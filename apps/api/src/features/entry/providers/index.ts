import { db } from "@/config/database";
import type { TReturnHanler } from "@/shared/models/promises";
import { and, eq, ilike, isNull } from "drizzle-orm";
import type {
  TInsertEntry,
  TNewEntry,
  TReadEntry,
} from "../models/entry.models";
import { Entry } from "../schema";

export class EntryProvider {
  static async getPrivateEntryById({
    entryId,
    userId,
  }: {
    entryId: string;
    userId: string;
  }): Promise<TReadEntry | undefined> {
    const [entry] = await db
      .select()
      .from(Entry)
      .where(and(eq(Entry.id, entryId), eq(Entry.user_id, userId)));

    return entry;
  }

  static async getPublicEntryById({
    entryId,
  }: {
    entryId: string;
  }): Promise<TReadEntry | undefined> {
    const [entry] = await db.select().from(Entry).where(eq(Entry.id, entryId));

    return entry;
  }

  static async getEntriesListByUserId(userId: string): Promise<TReadEntry[]> {
    const entries = await db
      .select()
      .from(Entry)
      .where(eq(Entry.user_id, userId));

    return entries;
  }

  static async getPrivateEntryListByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<TReadEntry[]> {
    const entries = await db
      .select()
      .from(Entry)
      .where(and(ilike(Entry.title, title), eq(Entry.user_id, userId)));

    return entries;
  }

  static async createEntry({
    entry,
    userId,
  }: {
    entry: TInsertEntry;
    userId: TReadEntry["user_id"];
  }): Promise<TReturnHanler<TReadEntry, string>> {
    const newEntryValues: TNewEntry = {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
      ...entry,
      user_id: userId,
    };

    try {
      const [newEntry] = await db
        .insert(Entry)
        .values(newEntryValues)
        .returning();

      if (!newEntry) throw new Error("Failed to create entry");

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
        .update(Entry)
        .set({ end_date: new Date() })
        .where(and(eq(Entry.id, entryId), eq(Entry.user_id, userId)));
      return { error: null };
    } catch (error) {
      return { error: "unknown" };
    }
  }

  static async updateEntry({
    values,
    entryId,
  }: {
    entryId: TReadEntry["id"];
    values: TInsertEntry;
  }): Promise<{ error: string | null }> {
    try {
      await db
        .update(Entry)
        .set(values)
        .where(and(eq(Entry.id, entryId), isNull(Entry.end_date)));

      return { error: null };
    } catch (error) {
      return { error: "error updating entry" };
    }
  }
}
