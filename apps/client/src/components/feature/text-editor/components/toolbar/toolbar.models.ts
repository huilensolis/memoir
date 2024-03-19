import { type Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  type LucideIcon,
  Quote,
  Strikethrough,
} from "lucide-react";

type TOption = {
  icon: LucideIcon;
  method: (editor: Editor) => void;
};

export const OPTIONS: TOption[] = [
  {
    icon: Bold,
    method: (editor) => {
      editor.chain().focus().toggleBold().run();
    },
  },
  {
    icon: Italic,
    method: (editor) => {
      editor.chain().focus().toggleItalic().run();
    },
  },
  {
    icon: Strikethrough,
    method: (editor) => {
      editor.chain().focus().toggleStrike().run();
    },
  },
  {
    icon: Quote,
    method: (editor) => {},
  },
  {
    icon: Heading1,
    method: (editor) => {
      editor.commands.insertContent({
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "title",
          },
        ],
      });

      editor.chain().focus().run();
    },
  },
  {
    icon: Heading2,
    method: (editor) => {
      editor.commands.insertContent({
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "title",
          },
        ],
      });

      editor.chain().focus().run();
    },
  },
  {
    icon: Heading3,
    method: (editor) => {
      editor.commands.insertContent({
        type: "heading",
        attrs: {
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "title",
          },
        ],
      });

      editor.chain().focus().run();
    },
  },
];
