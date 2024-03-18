import { type Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type TProps = {
  editor: Editor;
};

export function Toolbar({ editor }: TProps) {
  function convertToItalic() {
    editor.chain().focus().toggleItalic().run();
  }

  function convertToBold() {
    console.log("running");
    editor.chain().focus().toggleBold().run();
  }

  function convertToStrike() {
    editor.chain().focus().toggleStrike().run();
  }

  function undo() {
    editor.chain().undo().run();
  }

  function redo() {
    editor.chain().redo().run();
  }

  function convertToQuote() {}

  function toggleHeading({ level }: { level: number }) {
    editor.commands.insertContent({
      type: "heading",
      attrs: {
        level,
      },
      content: [
        {
          type: "text",
          text: "Title",
        },
      ],
    });

    editor.chain().focus().run();
  }

  return (
    <Command className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Text Formatting">
          <CommandItem>
            <button className="w-full flex" onClick={convertToBold}>
              <Bold className="mr-2 h-4 w-4" />
              <span>Bold</span>
            </button>
          </CommandItem>
          <CommandItem>
            <button className="w-full flex" onClick={convertToItalic}>
              <Italic className="mr-2 h-4 w-4" />
              <span>Italic</span>
            </button>
          </CommandItem>
          <CommandItem>
            <button className="w-full flex" onClick={convertToStrike}>
              <Strikethrough className="mr-2 h-4 w-4" />
              <span>Strike</span>
            </button>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Blocks">
          <CommandItem value="Heading-1">
            <button
              className="w-full flex"
              onClick={() => {
                toggleHeading({ level: 1 });
              }}
            >
              <Heading1 className="mr-2 h-4 w-4" />
              <span>Heading</span>
            </button>
          </CommandItem>
          <CommandItem value="heading-2">
            <button
              className="w-full flex"
              onClick={() => {
                toggleHeading({ level: 2 });
              }}
            >
              <Heading2 className="mr-2 h-4 w-4" />
              <span>Heading</span>
            </button>
          </CommandItem>
          <CommandItem value="heading-3">
            <button
              className="w-full flex"
              onClick={() => {
                toggleHeading({ level: 3 });
              }}
            >
              <Heading3 className="mr-2 h-4 w-4" />
              <span>Heading</span>
            </button>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem disabled={!editor.can().undo()}>
            <button className="w-full flex" onClick={undo}>
              <Undo className="mr-2 h-4 w-4" />
              <span>Undo</span>
            </button>
          </CommandItem>
          <CommandItem disabled={!editor.can().redo()}>
            <button className="w-full flex" onClick={redo}>
              <Redo className="mr-2 h-4 w-4" />
              <span>Redo</span>
            </button>
          </CommandItem>
          <CommandItem>
            <button className="w-full flex" onClick={convertToQuote}>
              <Undo className="mr-2 h-4 w-4" />
              <span>Convert to quote</span>
            </button>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
