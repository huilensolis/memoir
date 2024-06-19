import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import { EntryEditor } from "./(components)/entry-editor/entry-editor.component";
import { EntryHeader } from "./(components)/entry-header/entry-header.component";
import { EntryTitle } from "./(components)/entry-title/entry-title.component";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entry - Memoir",
};

export default async function EntryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { cookie } = getCookie();

  if (!cookie)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>There has been an error, please reload the page</p>
      </div>
    );

  const { entry, error } = await EntryService.readEntryById({
    entryId: id,
    cookie,
  });

  if (!entry || error) return <p>404 - not found</p>;

  if (typeof entry.end_date === "string") {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>
          Entry deleted - you can restore it{" "}
          <Link href="" className="underline text-blue-600">
            here (not implemented yet)
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <div className="w-full flex items-center justify-center p-2 bg-zinc-100 border-b border-gray-200">
        <div className="max-w-4xl w-full">
          <EntryHeader entryId={id} />
        </div>
      </div>
      <main className="w-full flex justify-center py-10 px-3 lg:px-5 max-h-[calc(100vh-50px)] overflow-y-auto">
        <div className="flex flex-col gap-3 max-w-4xl w-full h-full">
          <header className="flex flex-col">
            <EntryTitle entryId={entry.id} defaultValue={entry.title} />
          </header>
          <EntryEditor initialContent={entry.content} entry={entry} />
        </div>
      </main>
    </div>
  );
}
