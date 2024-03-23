import { create } from "zustand";
import { BLOCK_COMMANDS } from "./command-menu.models";
import { type Editor } from "@tiptap/react";

type TCommandMenuStore = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  indexOfCurrentOption: number | null;

  setIndexOfCurrentOption: (newIndex: number) => void;
  handleUp: (editor: Editor) => void;
  handleDown: (editor: Editor) => void;
  handleSelect: (editor: Editor) => void;
};

export const useCommandMenuStore = create<TCommandMenuStore>((set, get) => ({
  isVisible: false,
  setIsVisible(value) {
    set(() => ({ isVisible: value }));
  },
  indexOfCurrentOption: 0, //  TODO: implement init function to search for the first enabled option in case index 0 is disabled
  setIndexOfCurrentOption(newIndex) {
    set((_state: TCommandMenuStore) => ({
      indexOfCurrentOption: newIndex,
    }));
  },
  handleUp(editor) {
    const indexOfCurrentOption = get().indexOfCurrentOption;

    if (indexOfCurrentOption === null) return;

    function findIndexOfNextEnabledOption(indexOfCurrentOption: number) {
      let returnIndexOfNextOption: number | null = null;

      const aboveCommands = BLOCK_COMMANDS.slice(0, indexOfCurrentOption);
      for (let i = aboveCommands.length - 1; i <= aboveCommands.length; i--) {
        const indexOfNextOption = i;

        const nextOption = aboveCommands[indexOfNextOption];

        const isNexOptionDisabled = nextOption.isDisabled(editor);

        if (!isNexOptionDisabled) {
          returnIndexOfNextOption = i;
          break;
        }
      }
      return returnIndexOfNextOption;
    }

    if (indexOfCurrentOption === 0) {
      const nextOption = findIndexOfNextEnabledOption(BLOCK_COMMANDS.length);

      if (nextOption !== null) {
        get().setIndexOfCurrentOption(nextOption);
      }

      return;
    }

    const nextOption = findIndexOfNextEnabledOption(indexOfCurrentOption);

    if (nextOption !== null) {
      get().setIndexOfCurrentOption(nextOption);
    }
  },
  handleDown(editor) {
    const indexOfCurrentOption = get().indexOfCurrentOption;

    if (indexOfCurrentOption === null) return;

    function findIndexOfNextEnabledOption(indexOfCurrentOption: number) {
      let returnIndexOfNextOption: number | null = null;

      for (let i = indexOfCurrentOption; i < BLOCK_COMMANDS.length; i++) {
        const indexOfNextOption = i;

        const nextOption = BLOCK_COMMANDS[indexOfNextOption];

        const isNexOptionDisabled = nextOption.isDisabled(editor);

        if (!isNexOptionDisabled) {
          returnIndexOfNextOption = i;
          break;
        }
      }
      return returnIndexOfNextOption;
    }

    if (indexOfCurrentOption === BLOCK_COMMANDS.length - 1) {
      const nextOption = findIndexOfNextEnabledOption(0);

      if (nextOption !== null) {
        get().setIndexOfCurrentOption(nextOption);
      }
      return;
    }

    const nextOption = findIndexOfNextEnabledOption(indexOfCurrentOption + 1);

    if (nextOption !== null) {
      get().setIndexOfCurrentOption(nextOption);
    } else {
      const nextOption = findIndexOfNextEnabledOption(0);
      if (nextOption !== null) {
        get().setIndexOfCurrentOption(nextOption);
      }
    }
  },
  handleSelect(editor) {
    const indexOfCurrentOption = get().indexOfCurrentOption;

    if (indexOfCurrentOption === null) return;

    BLOCK_COMMANDS[indexOfCurrentOption].method(editor);
  },
}));
