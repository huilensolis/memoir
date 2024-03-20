import { type Editor } from "@tiptap/react";
import { ToolBarOption } from "./components/option";
import { OPTIONS } from "./toolbar.models";
import { Box } from "@/components/ui/box";

type TProps = {
  editor: Editor;
};

export function Toolbar({ editor }: TProps) {
  return (
    <Box className="flex items-center justify-center w-full rounded-sm overflow-hidden">
      <ul className="flex flex-wrap items-center justify-center w-full">
        {OPTIONS.map((option, i) => (
          <li key={i} className="flex items-center justify-center h-full">
            <ToolBarOption
              onClick={() => {
                option.method(editor);
              }}
              isActive={option.isActive(editor)}
            >
              <option.icon />
            </ToolBarOption>
          </li>
        ))}
      </ul>
    </Box>
  );
}
