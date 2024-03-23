"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { type Editor } from "@tiptap/react";
import { useCommandMenuStore } from "../../stores/command-menu";

export function CommandMenu({
  editor,
  searchValue,
}: {
  editor: Editor;
  searchValue: string;
}) {
  const indexOfCurrentOption = useCommandMenuStore(
    (state) => state.indexOfCurrentOption,
  );

  const setIndexOfCurrentOption = useCommandMenuStore(
    (state) => state.setIndexOfCurrentOption,
  );

  const handleSelect = useCommandMenuStore((state) => state.handleSelect);

  const commands = useCommandMenuStore((state) => state.commands);

  return (
    <Command className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800">
      <CommandInput
        placeholder="Type a command or search..."
        value={searchValue}
      />
      <CommandList>
        <CommandSeparator />
        <CommandGroup heading="Blocks" autoFocus>
          {commands.map((command, i) => (
            <CommandItem
              className="w-full"
              key={command.text}
              isActive={i === indexOfCurrentOption}
              value={command.text}
            >
              <button
                className="w-full flex items-center"
                onClick={() => {
                  setIndexOfCurrentOption(i);
                  handleSelect(editor);
                }}
              >
                <command.icon className="mr-2 h-4 w-4" />
                <span>{command.text}</span>
              </button>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
