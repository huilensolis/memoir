"use client";

import { TextEditor } from "@/components/feature/text-editor";
import { useDebounce } from "@/hooks/use-debounce";
import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useEntryStore } from "../../(store)/entry-store";
import { EntryService } from "@/models/api/entry";
import type { Entry, NewEntry } from "@/types/entry";

export function EntryEditor({
  initialContent,
  entry,
}: {
  initialContent: Entry["content"];
  entry: Entry;
}) {
  // we dont use this state to send the content to the editor, but rather to handle the transactions saving.
  // the editor starts from an initial content, and then manages the changed content by itself
  const [throttlingContent, setThrottlingContent] =
    useState<Entry["content"]>(initialContent);

  const { debouncedValue: debouncedContent } = useDebounce<Entry["content"]>({
    value: throttlingContent,
    delay: 2000,
  });

  const setEntryId = useEntryStore((state) => state.setEntryId);
  const setEntryState = useEntryStore((state) => state.setState);
  const entryState = useEntryStore((state) => state.state);

  function handleTransaction({ editor }: { editor: Editor }) {
    if (entryState !== "waiting") {
      setEntryState("waiting");
    }

    setThrottlingContent(editor.getJSON());
  }

  useEffect(() => {
    setEntryId(entry.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function saveDocumentNewData({ signal }: { signal: AbortSignal }) {
      setEntryState("saving");

      function getEntryTitle(): string {
        if (
          debouncedContent.content &&
          debouncedContent.content[0] &&
          debouncedContent.content[0].content &&
          debouncedContent.content[0].content[0].text
        ) {
          return debouncedContent.content[0].content[0].text.trim();
        }

        return entry.title;
      }

      const updatedEntry: NewEntry = {
        title: getEntryTitle(),
        content: debouncedContent,
        word_count: 0,
      };
      await EntryService.updateEntryById({
        entryId: entry.id,
        entry: updatedEntry,
        signal,
      });

      setEntryState("up to date");
    }

    const ctrl = new AbortController();

    if (entryState !== "up to date") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      saveDocumentNewData({ signal: ctrl.signal });
    }

    return () => {
      ctrl.abort();
      setEntryState("waiting");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);

  return (
    <TextEditor content={initialContent} onTransaction={handleTransaction} />
  );
}
