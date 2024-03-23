import { create } from "zustand";
import { BLOCK_COMMANDS, type TCommandItem } from "./command-menu.models";
import { type Editor } from "@tiptap/react";

type TCommandMenuStore = {
  isMenuVisible: boolean;
  setIsMenuVisible: (value: boolean) => void;
  commands: TCommandItem[];

  indexOfCurrentOption: number;
  setIndexOfCurrentOption: (newIndex: number) => void;

  filterByTitle: (title: string) => void;
  handleUp: () => void;
  handleDown: () => void;
  handleSelect: (editor: Editor) => void;
};

export const useCommandMenuStore = create<TCommandMenuStore>((set, get) => ({
  isMenuVisible: false,
  setIsMenuVisible(value) {
    set(() => ({ isMenuVisible: value }));
  },
  commands: [...BLOCK_COMMANDS],
  filterByTitle(title) {},
  indexOfCurrentOption: 0,
  setIndexOfCurrentOption(newIndex) {
    set((_state: TCommandMenuStore) => ({
      indexOfCurrentOption: newIndex,
    }));
  },
  handleUp() {
    console.log("running handle up");
    const indexOfCurrentOption = get().indexOfCurrentOption;

    if (indexOfCurrentOption === 0) {
      // if current option is the first one
      get().setIndexOfCurrentOption(get().commands.length - 1);
      return;
    }

    get().setIndexOfCurrentOption(indexOfCurrentOption - 1);
  },
  handleDown() {
    const indexOfCurrentOption = get().indexOfCurrentOption;

    if (indexOfCurrentOption === get().commands.length - 1) {
      // if current option is last one
      get().setIndexOfCurrentOption(0);
      return;
    }

    get().setIndexOfCurrentOption(indexOfCurrentOption + 1);
  },
  handleSelect(editor) {
    const indexOfCurrentOption = get().indexOfCurrentOption;

    BLOCK_COMMANDS[indexOfCurrentOption].command(editor);
  },
}));
