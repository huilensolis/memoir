"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./components/toolbar";

export function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
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
      }),
    ],
    content: "Hello World!",
  });

  return (
    <div>
      {editor && (
        <>
          <BubbleMenu editor={editor} updateDelay={300}>
            <Toolbar editor={editor} />
          </BubbleMenu>
          <EditorContent editor={editor} className="w-full h-full" />
        </>
      )}
    </div>
  );
}
