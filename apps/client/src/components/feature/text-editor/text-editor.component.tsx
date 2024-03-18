"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";

import { Toolbar } from "./components/toolbar";

export function TextEditor() {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "outline-none py-4",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "italic",
          },
        },
        strike: {
          HTMLAttributes: {
            class: "line-through",
          },
        },
        code: false,
      }),
      Typography.configure({
        oneHalf: false,
        oneQuarter: false,
        threeQuarters: false,
        laquo: false,
        raquo: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") return "Title";
          return "";
        },
        emptyEditorClass:
          "before:[content:_attr(data-placeholder);] before:outline-none before:h-0 before:pointer-events-none before:float-left before:text-neutral-400",
      }),
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
  });

  return (
    <div>
      {editor && (
        <>
          <BubbleMenu editor={editor} updateDelay={300}>
            <Toolbar editor={editor} />
          </BubbleMenu>
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <Toolbar editor={editor} />
          </FloatingMenu>
          <EditorContent
            editor={editor}
            className="w-full h-full min-h-screen"
          />
        </>
      )}
    </div>
  );
}
