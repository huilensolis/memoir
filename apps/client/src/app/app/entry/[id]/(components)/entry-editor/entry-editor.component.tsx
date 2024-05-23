"use client";

import { TextEditor } from "@/components/feature/text-editor";
import { useDebounce } from "@/hooks/use-debounce";
import { Transaction } from "@tiptap/pm/state";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useEntryStore } from "../../(store)/entry-store";
import { EntryService } from "@/models/api/entry";
import { Entry, NewEntry } from "@/types/entry";

export function EntryEditor({
  initialContent,
  entry,
}: {
  initialContent: Record<string, any>;
  entry: Entry;
}) {
  // we dont use this state to send the content to the editor, but rather to handle the transactions saving.
  // the editor starts from an initial content, and then manages the changed content by itself
  const [throttlingContent, setThrottlingContent] = useState(initialContent);

  const { debouncedValue: debouncedContent } = useDebounce({
    value: throttlingContent,
    delay: 2000,
  });

  const setEntryId = useEntryStore((state) => state.setEntryId);
  const setEntryState = useEntryStore((state) => state.setState);
  const entryState = useEntryStore((state) => state.state);

  function handleTransaction({
    editor,
    transaction,
  }: {
    editor: Editor;
    transaction: Transaction;
  }) {
    if (entryState !== "waiting") {
      setEntryState("waiting");
    }

    setThrottlingContent(editor.getJSON());
  }

  useEffect(() => {
    setEntryId(entry.id);
  }, []);

  useEffect(() => {
    async function saveDocumentNewData({ signal }: { signal: AbortSignal }) {
      setEntryState("saving");
      const { title } = entry;
      const updatedEntry: NewEntry = {
        title,
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
      saveDocumentNewData({ signal: ctrl.signal });
    }

    return () => {
      ctrl.abort();
      setEntryState("waiting");
    };
  }, [debouncedContent]);

  return (
    <>
      <TextEditor content={initialContent} onTransaction={handleTransaction} />
    </>
  );
}
