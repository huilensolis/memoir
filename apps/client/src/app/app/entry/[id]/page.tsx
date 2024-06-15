import moment from "moment";

import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import { EntryEditor } from "./(components)/entry-editor/entry-editor.component";
import { EntryHeader } from "./(components)/entry-header/entry-header.component";
import { EntryTitle } from "./(components)/entry-title/entry-title.component";
import { CalendarFold } from "lucide-react";

export default async function EntryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { cookie } = getCookie();

  if (!cookie) return <p>There has been an error, please reload the page</p>;

  const { entry, error } = await EntryService.readEntryById({
    entryId: id,
    cookie,
  });

  if (!entry || error) return <p>404 - not found</p>;

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <div className="w-full flex items-center justify-center p-3 bg-zinc-100 border-b border-gray-200">
        <div className="max-w-4xl w-full">
          <EntryHeader />
        </div>
      </div>
      <main className="w-full flex justify-center py-10 px-3 lg:px-5 max-h-[calc(100vh-50px)] overflow-y-auto">
        <div className="max-w-4xl w-full h-full">
          <header className="flex flex-col">
            <EntryTitle entryId={entry.id} defaultValue={entry.title} />
            <div
              className="flex gap-2 items-center"
              title={`last time updated: ${moment(entry.updated_at).startOf("seconds").fromNow()}`}
            >
              <CalendarFold className="w-5 h-5 text-neutral-400" />
              <p className="text-neutral-400">
                {moment(entry.updated_at).startOf("seconds").fromNow()}
              </p>
            </div>
          </header>
          <EntryEditor initialContent={entry.content} entry={entry} />
        </div>
      </main>
    </div>
  );
}
