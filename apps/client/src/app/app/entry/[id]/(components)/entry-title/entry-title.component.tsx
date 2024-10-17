"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

export function EntryTitle({
  defaultValue = "",
  onUpdateTitle,
}: {
  defaultValue?: string;
  onUpdateTitle: (title: string) => void;
}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const { debouncedValue: debouncedTitle } = useDebounce({
    value: inputValue,
    delay: 500,
  });

  const renderingTimes = useRef(1);

  useEffect(() => {
    if (renderingTimes.current === 1) {
      renderingTimes.current++;
      return;
    }

    async function UpdateTitle() {
      onUpdateTitle(debouncedTitle);
    }

    if (defaultValue === debouncedTitle) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    UpdateTitle();

    renderingTimes.current++;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  const textareaElement = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaElement.current) {
      const scrollHeight = textareaElement.current.scrollHeight;
      textareaElement.current.style.height = scrollHeight + "px";
    }
  }, [textareaElement]);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);

    if (!textareaElement.current) return;

    textareaElement.current.style.height = "auto";

    const scrollHeight = textareaElement.current.scrollHeight;
    textareaElement.current.style.height = scrollHeight + "px";
  }

  return (
    <textarea
      className="focus:outline-none font-bold text-[2.6666667em] bg-transparent w-full resize-none leading-none"
      ref={textareaElement}
      rows={1}
      wrap="soft"
      placeholder="Title"
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
}
