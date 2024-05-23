import { type Editor } from "@tiptap/react";
import { Heading1, Heading2, Heading3, type LucideIcon } from "lucide-react";

export type TCommandItem = {
  icon: LucideIcon;
  text: string;
  command: (editor: Editor) => void;
};

export const BLOCK_COMMANDS: TCommandItem[] = [
  {
    icon: Heading1,
    text: "Heading 1",
    command: (editor) => {
      editor.chain().focus().selectNodeBackward().deleteSelection().run();

      editor.chain().toggleHeading({ level: 2 }).run();
    },
  },
  {
    icon: Heading2,
    text: "Heading 2",
    command: (editor) => {
      editor.chain().focus().selectNodeBackward().deleteSelection().run();

      editor.chain().toggleHeading({ level: 3 }).run();
    },
  },
  {
    icon: Heading3,
    text: "Heading 3",
    command: (editor) => {
      editor.chain().focus().selectNodeBackward().deleteSelection().run();

      editor.chain().toggleHeading({ level: 4 }).run();
    },
  },
];
