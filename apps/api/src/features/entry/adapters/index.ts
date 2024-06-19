import type { TEntrySafe, TReadEntry } from "../models/entry.models";

export class EntryAdapter {
	static toSafeEntry(unsafeEntry: TReadEntry): {
		safeEntry: TEntrySafe;
	} {
		const { user_id, is_private, ...safeKeys } = unsafeEntry;

		return { safeEntry: safeKeys };
	}

	static toNotDeleted<T extends TEntrySafe | TReadEntry>(
		entry: T,
	): { entry: T | null } {
		if (entry.end_date === null) {
			return { entry };
		}

		return { entry: null };
	}
}
