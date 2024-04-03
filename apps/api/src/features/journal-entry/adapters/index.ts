import {
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
}
