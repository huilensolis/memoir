import { type Editor } from "@tiptap/react";
import { Heading1, Heading2, Heading3, type LucideIcon } from "lucide-react";

type TCommand = {
  icon: LucideIcon;
  text: string;
  method: (editor: Editor) => void;
  disabled: (editor: Editor) => boolean;
};

export const BLOCK_COMMANDS: TCommand[] = [
  {
    icon: Heading1,
    text: "Heading 1",
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
    disabled: (editor) =>
      editor.can().insertContent({
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
      }),
  },
  {
    icon: Heading2,
    text: "Heading 2",
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
    disabled: (editor) =>
      editor.can().insertContent({
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
      }),
  },
  {
    icon: Heading3,
    text: "Heading 3",
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
    disabled: (editor) =>
      editor.can().insertContent({
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
      }),
  },
];
