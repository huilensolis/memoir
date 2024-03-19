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

export function CommandMenu({
  editor,
  searchValue,
}: {
  editor: Editor;
  searchValue: string;
}) {
  return (
    <Command className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800">
      <CommandInput
        placeholder="Type a command or search..."
        value={searchValue}
      />
      <CommandList>
        <CommandSeparator />
        <CommandGroup heading="Blocks">
          {BLOCK_COMMANDS.map((command) => (
            <CommandItem
              value={command.text}
              disabled={!command.disabled(editor)}
              key={command.text}
            >
              <button
                className="w-full flex"
                onClick={() => {
                  command.method(editor);
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
