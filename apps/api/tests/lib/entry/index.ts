import { app } from "@/app";
import type { TInsertEntry } from "@/features/entry/models/entry.models";
import { endpointPath } from "@/tests/integration/entry";

export async function createNewEntry(
	entry: TInsertEntry,
	cookie: string,
): Promise<{ EntryId: string | null }> {
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

		return { EntryId: body.id };
	} catch (error) {
		return { EntryId: null };
	}
}
