import { type Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Quote,
  type LucideIcon,
} from "lucide-react";

type TCommand = {
  icon: LucideIcon;
  text: string;
  method: (editor: Editor) => void;
  isDisabled: (editor: Editor) => boolean;
};

export const BLOCK_COMMANDS: TCommand[] = [
  {
    icon: Heading1,
    text: "Heading 1",
    method: (editor) => {
      editor
        .chain()
        .focus()
        .deleteNode("paragraph")
        .enter()
        .toggleHeading({ level: 1 })
        .run();
    },
    isDisabled: (editor) => !editor.can().toggleHeading({ level: 1 }),
  },
  {
    icon: Heading2,
    text: "Heading 2",
    method: (editor) => {
      editor.chain().focus().deleteNode("paragraph").run();

      editor.chain().focus().enter().run();

      editor.commands.toggleHeading({ level: 2 });
    },
    isDisabled: (editor) => !editor.can().toggleHeading({ level: 2 }),
  },
  {
    icon: Quote,
    text: "Quote",
    method: (editor) => {},
    isDisabled: (editor) => true,
  },
  {
    icon: Heading3,
    text: "Heading 3",
    method: (editor) => {
      editor.chain().focus().deleteNode("paragraph").run();

      editor.chain().focus().enter().run();

      editor.commands.toggleHeading({ level: 3 });
    },
    isDisabled: (editor) => !editor.can().toggleHeading({ level: 3 }),
  },
];
