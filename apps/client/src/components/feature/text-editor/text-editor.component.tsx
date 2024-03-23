"use client";

import Document from "@tiptap/extension-document";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  type Editor,
  Extension,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";

import { Toolbar } from "./components/toolbar";
import { useState } from "react";
import { useCommandMenuStore } from "./stores/command-menu";
import { CommandMenu } from "./components/command-menu";
import { Plugin, PluginKey } from "@tiptap/pm/state";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export function TextEditor() {
  const [commandMenusearchValue, setCommandMenuSearchValue] = useState("");

  const isCommandMenuVisible = useCommandMenuStore((store) => store.isVisible);
  const setCommandMenuIsVisible = useCommandMenuStore(
    (store) => store.setIsVisible,
  );

  const handleUp = useCommandMenuStore((store) => store.handleUp);
  const handleDown = useCommandMenuStore((store) => store.handleDown);
  const handleSelect = useCommandMenuStore((store) => store.handleSelect);

  const PreventDefualtBehaviorOfEnter = Extension.create({
    name: "preventDefaultEnter",

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("preventDefaultEnterPLugin"),
          props: {
            handleKeyDown(view, event) {
              if (event.key === "Enter") {
                console.log("running enter");
                console.log(isCommandMenuVisible);
                if (isCommandMenuVisible) {
                  return true;
                }
                return false;
              }
            },
          },
        }),
      ];
    },
  });
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "outline-none prose text-neutral-800",
      },
    },
    extensions: [
      CustomDocument,
      PreventDefualtBehaviorOfEnter,
      StarterKit.configure({
        document: false,
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
          return "what's on your mind";
        },
        emptyNodeClass:
          "before:[content:_attr(data-placeholder);] before:outline-none before:h-0 before:pointer-events-none before:float-left before:text-neutral-400",
      }),
    ],
    autofocus: "start",
    editable: true,
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp") {
      if (editor && isCommandMenuVisible) {
        e.preventDefault();
        handleUp(editor);
      }
    }
    if (e.key === "ArrowDown") {
      if (editor && isCommandMenuVisible) {
        e.preventDefault();
        handleDown(editor);
      }
    }
    if (e.key === "Enter") {
      if (editor && isCommandMenuVisible) {
        handleSelect(editor);
      }
    }
  }

  return (
    <div>
      {editor && (
        <>
          <BubbleMenu editor={editor} updateDelay={300} className="w-full">
            <Toolbar editor={editor} />
          </BubbleMenu>
          <FloatingMenu
            shouldShow={({ view }): boolean => {
              try {
                if ((view as any).trackWrites.data === undefined)
                  throw new Error("track data is undefined");

                const currentLineInput = (view as any).trackWrites
                  .data as string; // line input

                if (currentLineInput.startsWith("/")) {
                  console.log("setting it to true");
                  setCommandMenuIsVisible(true);

                  setCommandMenuSearchValue(currentLineInput.split("/")[1]);

                  return true;
                }

                setCommandMenuIsVisible(false);
                return false;
              } catch (error) {
                // DO NOT REMOVE. This is necesary to delay it and do not run before a command;
                setTimeout(() => {
                  setCommandMenuIsVisible(false);
                }, 0);
              }
            }}
            editor={editor}
            tippyOptions={{ duration: 100 }}
          >
            <CommandMenu editor={editor} searchValue={commandMenusearchValue} />
          </FloatingMenu>
          <EditorContent
            editor={editor}
            className="w-full h-full min-h-screen"
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </div>
  );
}
