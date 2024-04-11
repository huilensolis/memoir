import { app } from "@/app";
import { TInsertJournalEntry } from "@/features/journal-entry/models/joruanl-entry.models";
import { endpointPath } from "@/tests/integration/journal-entry";

export async function createNewEntry(
  entry: TInsertJournalEntry,
  cookie: string,
): Promise<{ journalEntryId: string | null }> {
  try {
    const res = await app.handle(
      new Request(`${endpointPath}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
        body: JSON.stringify(entry),
      }),
    );

    const body: { id: string } = await res.json();

    return { journalEntryId: body.id };
  } catch (error) {
    console.log(error);
    return { journalEntryId: null };
  }
}
