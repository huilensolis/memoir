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
import { BLOCK_COMMANDS } from "../../stores/command-menu/command-menu.models";
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

  return (
    <Command className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800">
      <CommandInput
        placeholder="Type a command or search..."
        value={searchValue}
      />
      <CommandList>
        <CommandSeparator />
        <CommandGroup heading="Blocks" autoFocus>
          {BLOCK_COMMANDS.map((command, i) => (
            <CommandItem
              className="w-full"
              disabled={command.isDisabled(editor)}
              key={command.text}
              isActive={i === indexOfCurrentOption}
              onClick={() => {
                command.method(editor);
              }}
              value={command.text}
            >
              <command.icon className="mr-2 h-4 w-4" />
              <span>{command.text}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
