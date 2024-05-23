import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import { EntryEditor } from "./(components)/entry-editor/entry-editor.component";
import { EntryHeader } from "./(components)/entry-header/entry-header.component";

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
    <div className="h-full w-full flex flex-col items-center justify-start py-10 gap-10">
      <div className="w-full max-w-2xl">
        <EntryHeader />
      </div>
      <main className="h-full w-full max-w-2xl">
        <EntryEditor initialContent={entry.content} entry={entry} />
      </main>
    </div>
  );
}
