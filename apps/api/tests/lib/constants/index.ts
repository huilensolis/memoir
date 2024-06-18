import type { TInsertJournalEntry } from "@/features/journal-entry/models/joruanl-entry.models";

export const EXAMPLE_DOCUMENT_CONTENT: TInsertJournalEntry["content"] = {
	type: "doc",
	content: [
		{
			type: "heading",
			attrs: { level: 1 },
			content: [{ type: "text", marks: [{ type: "bold" }], text: "Memoir" }],
		},
	],
};
