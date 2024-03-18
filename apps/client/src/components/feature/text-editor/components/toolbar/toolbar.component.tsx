import { type Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough } from "lucide-react";

import { Button } from "@/components/ui/button";

type TProps = {
  editor: Editor;
};

export function Toolbar({ editor }: TProps) {
  function convertToItalic() {
    editor.chain().focus().toggleItalic().run();
  }

  function convertToBold() {
    editor.chain().focus().toggleBold().run();
  }

  function convertToStrike() {
    editor.chain().focus().toggleStrike().run();
  }

  return (
    <div className="flex items-center space-x-2">
      <Button size="sm" variant="outline" onClick={convertToBold}>
        <Bold className="h-4 w-4" />
        <span className="sr-only">Bold</span>
      </Button>
      <Button size="sm" variant="outline" onClick={convertToItalic}>
        <Italic className="h-4 w-4" />
        <span className="sr-only">Italic</span>
      </Button>
      <Button size="sm" variant="outline" onClick={convertToStrike}>
        <Strikethrough className="h-4 w-4" />
        <span className="sr-only">Strike</span>
      </Button>
    </div>
  );
}
