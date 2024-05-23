import { type Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  type LucideIcon,
  Strikethrough,
  CaseSensitive,
} from "lucide-react";

type TOption = {
  icon: LucideIcon;
  method: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

export const OPTIONS: TOption[] = [
  {
    icon: Bold,
    method: (editor) => {
      editor.chain().focus().toggleBold().run();
    },
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    icon: Italic,
    method: (editor) => {
      editor.chain().focus().toggleItalic().run();
    },
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    icon: Strikethrough,
    method: (editor) => {
      editor.chain().focus().toggleStrike().run();
    },
    isActive: (editor) => editor.isActive("strike"),
  },

  {
    icon: Heading1,
    method: (editor) => {
      editor
        .chain()
        .focus()
        .selectParentNode()
        .toggleHeading({ level: 1 })
        .run();
    },
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    icon: Heading2,
    method: (editor) => {
      editor.commands.toggleHeading({ level: 2 });
    },
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    icon: Heading3,
    method: (editor) => {
      editor.commands.toggleHeading({ level: 3 });
    },
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    icon: CaseSensitive,
    method: (editor) => {
      editor.commands.setParagraph();
    },
    isActive: (editor) => editor.isActive("paragraph"),
  },
];
