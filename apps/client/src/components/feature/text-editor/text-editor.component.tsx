"use client";

import Document from "@tiptap/extension-document";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  Extension,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";

import { Toolbar } from "./components/toolbar";
import { useEffect, useState } from "react";
import { useCommandMenuStore } from "./stores/command-menu";
import { CommandMenu } from "./components/command-menu";
import { Plugin, PluginKey, Transaction } from "@tiptap/pm/state";

const CustomDocument = Document.extend({
  content: "heading{1} block+",
});

export function TextEditor({
  content,
  onTransaction,
}: {
  content?: any;
  onTransaction?: ({
    editor,
    transaction,
  }: {
    editor: Editor;
    transaction: Transaction;
  }) => void;
}) {
  const [commandMenusearchValue, setCommandMenuSearchValue] = useState("");

  const isCommandMenuVisible = useCommandMenuStore(
    (store) => store.isMenuVisible,
  );
  const setCommandMenuIsVisible = useCommandMenuStore(
    (store) => store.setIsMenuVisible,
  );
  const filterCommandMenuOptions = useCommandMenuStore(
    (store) => store.filterByTitle,
  );

  useEffect(() => {
    filterCommandMenuOptions(commandMenusearchValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandMenusearchValue]);

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
        class: "outline-none",
      },
    },
    extensions: [
      CustomDocument,
      PreventDefualtBehaviorOfEnter,
      StarterKit.configure({
        document: false,
        heading: {
          levels: [1, 2, 3, 4],
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
          return "Write something or type '/' to open a command menu...";
        },
        emptyNodeClass:
          "before:[content:_attr(data-placeholder);] before:outline-none before:h-0 before:pointer-events-none before:float-left before:text-neutral-400",
      }),
    ],
    autofocus: "start",
    editable: true,
    ...(content && { content }),
    parseOptions: {
      preserveWhitespace: "full",
    },
    onTransaction: ({ transaction }) => {
      if (onTransaction && editor) {
        onTransaction({ editor, transaction });
      }
    },
  });

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp") {
      if (isCommandMenuVisible) {
        e.preventDefault();
        handleUp();
      }
    }
    if (e.key === "ArrowDown") {
      if (isCommandMenuVisible) {
        e.preventDefault();
        handleDown();
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
            shouldShow={({ view }): any => {
              try {
                if ((view as any).trackWrites.data === undefined)
                  throw new Error("track data is undefined");

                const currentLineInput = (view as any).trackWrites
                  .data as string; // line input

                if (
                  currentLineInput.startsWith("/") &&
                  currentLineInput.trimEnd() === currentLineInput
                ) {
                  setCommandMenuIsVisible(true);

                  setCommandMenuSearchValue(currentLineInput.split("/")[1]);

                  return true;
                }

                setCommandMenuIsVisible(false);
                return false;
              } catch (error) {
                // DO NOT REMOVE. This is necesary to delay it and do not run before a command option;
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
            className="w-full h-full min-h-screen prose prose-neutral dark:prose-invert prose-lg"
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </div>
  );
}
