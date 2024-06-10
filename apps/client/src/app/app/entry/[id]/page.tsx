import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import { EntryEditor } from "./(components)/entry-editor/entry-editor.component";
import { EntryHeader } from "./(components)/entry-header/entry-header.component";
import { EntryTitle } from "./(components)/entry-title/entry-title.component";

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
    <div className="h-full w-full flex flex-col items-center justify-start gap-5">
      <div className="w-full sticky top-0 left-0 z-10 flex items-center justify-center p-3 bg-zinc-100 border-b border-gray-200">
        <div className="max-w-2xl w-full">
          <EntryHeader />
        </div>
      </div>
      <main className="h-full w-full max-w-2xl py-10">
        <EntryTitle entryId={entry.id} defaultValue={entry.title} />
        <EntryEditor initialContent={entry.content} entry={entry} />
      </main>
    </div>
  );
}
