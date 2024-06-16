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
  // we dont use this state to set the content to the editor, but rather to handle the transactions saving.
  // the editor starts from an initial content, and then manages the changed content by itself
  // this state is just for savinf the changed editor content and then using it with useDebounce
  const [throttlingContent, setThrottlingContent] =
    useState<Entry["content"]>(initialContent);

  const [lastTimeUpdated, setLastTimeUpdated] = useState(new Date());

  const { debouncedValue: debouncedContent } = useDebounce<Entry["content"]>({
    value: throttlingContent,
    delay: 250,
  });

  const setEntryId = useEntryStore((state) => state.setEntryId);
  const setEntryState = useEntryStore((state) => state.setState);
  const getEntryState = useEntryStore((state) => state.getState);

  function handleTransaction({ editor }: { editor: Editor }) {
    if (getEntryState() !== "waiting") {
      setEntryState("waiting");
    }

    setThrottlingContent(editor.getJSON());
  }

  useEffect(() => {
    setEntryId(entry.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function saveDocumentNewData({
      signal,
      entryContent,
    }: {
      signal?: AbortSignal;
      entryContent: Entry["content"];
    }) {
      setEntryState("saving");

      const updatedEntry: Partial<NewEntry> = {
        content: entryContent,
      };

      await EntryService.updateEntryById({
        entryId: entry.id,
        entry: updatedEntry,
        signal,
      });

      setLastTimeUpdated(new Date());
      setEntryState("up to date");
    }

    const TimeIntervalId = setInterval(() => {
      // if the document has not been saved in the last 5 seconds, we save it
      if (getEntryState() === "up to date") {
        return;
      }
      if (lastTimeUpdated.getTime() < new Date().getTime() - 1000 * 2) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        saveDocumentNewData({ entryContent: throttlingContent });
      }
    }, 5000);

    const ctrl = new AbortController();

    if (getEntryState() !== "up to date") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      saveDocumentNewData({
        signal: ctrl.signal,
        entryContent: debouncedContent,
      });
    }

    return () => {
      ctrl.abort();
      clearInterval(TimeIntervalId);

      setEntryState("waiting");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);

  return (
    <TextEditor
      content={initialContent}
      onTransaction={handleTransaction}
      id={entry.id}
      className="pb-24"
    />
  );
}
