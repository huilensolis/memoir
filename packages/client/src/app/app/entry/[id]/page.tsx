import { TextEditor } from "@/components/feature/text-editor";
import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";

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
    <div className="h-full w-full flex justify-center items-start">
      <main className="h-full w-full max-w-2xl py-10">
        <TextEditor content={entry.content} />
      </main>
    </div>
  );
}
