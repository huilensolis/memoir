"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  Extension,
  type Editor,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";

import { Toolbar } from "./components/toolbar";
import { useEffect, useState } from "react";
import { useCommandMenuStore } from "./stores/command-menu";
import { CommandMenu } from "./components/command-menu";
import { Plugin, PluginKey, type Transaction } from "@tiptap/pm/state";

export function TextEditor({
  content,
  onTransaction,
  disableSlashMenu = false,
  id,
  className,
}: {
  content?: any;
  onTransaction?: ({
    editor,
    transaction,
  }: {
    editor: Editor;
    transaction: Transaction;
  }) => void;
  disableSlashMenu?: boolean;
  id?: string;
  className?: Element["className"];
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
            handleKeyDown(_view, event) {
              if (disableSlashMenu) return false;
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
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
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
      PreventDefualtBehaviorOfEnter,
      Typography.configure({
        oneHalf: false,
        oneQuarter: false,
        threeQuarters: false,
        laquo: false,
        raquo: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph")
            return "Write something or type '/' to open a command menu...";

          return "";
        },
        emptyNodeClass:
          "before:[content:_attr(data-placeholder);] before:outline-none before:h-0 before:pointer-events-none before:float-left before:text-neutral-400",
      }),
    ],
    autofocus: "start",
    editable: true,
    content: content ?? undefined,
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
    <>
      {editor && (
        <>
          <BubbleMenu editor={editor} updateDelay={300} className="w-full">
            <Toolbar editor={editor} />
          </BubbleMenu>
          <FloatingMenu
            shouldShow={({ editor, view, state, oldState }): any => {
              try {
                const selectedNodeJSON = editor
                  .$pos(state.selection.from)
                  .content.toJSON() as JSONContent["content"];

                if (!selectedNodeJSON) {
                  throw new Error("selected node json is false");
                }

                const selectedNode = selectedNodeJSON[0];

                const nodeType = selectedNode.type;

                if (nodeType !== "text") {
                  throw new Error("node type is not text");
                }

                const currentLineInput = selectedNode.text;

                if (!currentLineInput) {
                  throw new Error("could not get current line input");
                }

                if (
                  currentLineInput.startsWith("/") &&
                  currentLineInput.trimEnd() === currentLineInput &&
                  currentLineInput.split(" ").length <= 2
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
            className={[
              "w-full h-full prose prose-neutral dark:prose-invert prose-lg",
              className,
            ].join(" ")}
            onKeyDown={disableSlashMenu ? undefined : handleKeyDown}
            id={id || undefined}
          />
        </>
      )}
    </>
  );
}
