"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { EntryService } from "@/models/api/entry";
import type { Entry } from "@/types/entry";
import { useEffect, useRef, useState } from "react";
import { useEntryStore } from "../../(store)/entry-store";

export function EntryTitle({
  defaultValue = "",
  entryId,
}: {
  defaultValue?: string;
  entryId: Entry["id"];
}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const { debouncedValue: debouncedTitle } = useDebounce({
    value: inputValue,
    delay: 500,
  });

  const renderingTimes = useRef(1);

  const setEntryState = useEntryStore((state) => state.setState);

  useEffect(() => {
    if (renderingTimes.current === 1) {
      renderingTimes.current++;
      return;
    }

    async function UpdateTitle({ signal }: { signal: AbortSignal }) {
      setEntryState("saving");

      const { error } = await EntryService.updateEntryById({
        entryId,
        entry: { title: debouncedTitle },
        signal,
      });

      if (error) {
        setEntryState("error");

        return;
      }

      setEntryState("up to date");
    }

    const ctrl = new AbortController();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    UpdateTitle({ signal: ctrl.signal });

    renderingTimes.current++;

    return () => {
      ctrl.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  return (
    <input
      type="text"
      className="focus:outline-none font-bold text-[2.6666667em] bg-transparent w-full"
      placeholder="Title"
      defaultValue={defaultValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
}
