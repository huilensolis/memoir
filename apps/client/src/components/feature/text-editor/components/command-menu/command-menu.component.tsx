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
import { BLOCK_COMMANDS } from "./command-menu.models";
import { useState, type KeyboardEvent } from "react";

export function CommandMenu({
  editor,
  searchValue,
}: {
  editor: Editor;
  searchValue: string;
}) {
  const [indexOfCurrentOption, setIndexOfCurrentOption] = useState(0);

  function handleUp() {
    function findIndexOfNextEnabledOption(indexOfCurrentOption: number) {
      let returnIndexOfNextOption: number | null = null;

      const aboveCommands = BLOCK_COMMANDS.slice(0, indexOfCurrentOption);
      for (let i = aboveCommands.length - 1; i <= aboveCommands.length; i--) {
        const indexOfNextOption = i;

        const nextOption = aboveCommands[indexOfNextOption];

        const isNexOptionDisabled = nextOption.isDisabled(editor);

        if (!isNexOptionDisabled) {
          returnIndexOfNextOption = i;
          break;
        }
      }
      return returnIndexOfNextOption;
    }

    if (indexOfCurrentOption === 0) {
      const nextOption = findIndexOfNextEnabledOption(BLOCK_COMMANDS.length);

      if (nextOption !== null) {
        setIndexOfCurrentOption(nextOption);
      }

      return;
    }

    const nextOption = findIndexOfNextEnabledOption(indexOfCurrentOption);

    if (nextOption !== null) {
      setIndexOfCurrentOption(nextOption);
    }
  }

  function handleDown() {
    function findIndexOfNextEnabledOption(indexOfCurrentOption: number) {
      let returnIndexOfNextOption: number | null = null;

      for (let i = indexOfCurrentOption; i < BLOCK_COMMANDS.length; i++) {
        const indexOfNextOption = i;

        const nextOption = BLOCK_COMMANDS[indexOfNextOption];

        const isNexOptionDisabled = nextOption.isDisabled(editor);

        if (!isNexOptionDisabled) {
          returnIndexOfNextOption = i;
          break;
        }
      }
      return returnIndexOfNextOption;
    }

    if (indexOfCurrentOption === BLOCK_COMMANDS.length - 1) {
      const nextOption = findIndexOfNextEnabledOption(0);

      if (nextOption !== null) {
        setIndexOfCurrentOption(nextOption);
      }
      return;
    }

    const nextOption = findIndexOfNextEnabledOption(indexOfCurrentOption + 1);

    if (nextOption !== null) {
      setIndexOfCurrentOption(nextOption);
    } else {
      const nextOption = findIndexOfNextEnabledOption(0);
      if (nextOption !== null) {
        setIndexOfCurrentOption(nextOption);
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowUp") {
      handleUp();
    }
    if (e.key === "ArrowDown") {
      handleDown();
    }
  }
  return (
    <Command
      className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800"
      onKeyDown={handleKeyDown}
    >
      <CommandInput
        placeholder="Type a command or search..."
        value={searchValue}
      />
      <CommandList>
        <CommandSeparator />
        <CommandGroup heading="Blocks">
          {JSON.stringify({ indexOfCurrentOption })}

          {BLOCK_COMMANDS.map((command, i) => (
            <CommandItem
              className="w-full"
              disabled={command.isDisabled(editor)}
              key={command.text}
              isActive={i === indexOfCurrentOption}
              onClick={() => {
                command.method(editor);
              }}
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
