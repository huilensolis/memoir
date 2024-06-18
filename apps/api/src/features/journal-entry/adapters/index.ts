import type {
  TJournalEntrySafe,
  TReadJournalEntry,
} from "../models/joruanl-entry.models";

export class JournalEntryAdapter {
  static toSafeEntry(unsafeEntry: TReadJournalEntry): {
    safeEntry: TJournalEntrySafe;
  } {
    const { user_id, is_private, ...safeKeys } = unsafeEntry;

    return { safeEntry: safeKeys };
  }

  static toNotDeleted<T extends TJournalEntrySafe | TReadJournalEntry>(
    entry: T,
  ): { entry: T | null } {
    if (entry.end_date === null) {
      return { entry };
    }

    return { entry: null };
  }
}
