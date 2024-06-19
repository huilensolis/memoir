import type { TInsertEntry } from "@/features/entry/models/entry.models";

export const EXAMPLE_DOCUMENT_CONTENT: TInsertEntry["content"] = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", marks: [{ type: "bold" }], text: "Memoir" }],
    },
  ],
};
