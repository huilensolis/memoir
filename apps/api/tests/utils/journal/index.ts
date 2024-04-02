import { app } from "@/app";
import { TJournalEntryInsert } from "@/features/journal-entry/models/joruanl-entry.models";
import { endpointPath } from "@/tests/integration/journal-entry";

export async function createNewEntry(
  entry: TJournalEntryInsert,
  cookie: string,
) {
  try {
    await app.handle(
      new Request(`${endpointPath}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          cookie: cookie,
        },
        body: JSON.stringify(entry),
      }),
    );
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
