import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import { EntryEditor } from "./(components)/entry-editor/entry-editor.component";
import { EntryTitle } from "./(components)/entry-title/entry-title.component";
import Link from "next/link";

import type { Metadata } from "next";
import { EntryOptions } from "./(components)/entry-options/entry-options.component";

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
      <main className="w-full relative flex justify-center py-10 px-3 lg:px-5">
        <div className="flex flex-col gap-3 max-w-4xl w-full h-full">
          <header className="flex flex-col">
            <EntryTitle entryId={entry.id} defaultValue={entry.title} />
          </header>
          <EntryEditor initialContent={entry.content} entry={entry} />
          <footer className="fixed bottom-0 lg:left-80 left-0 w-full">
            <EntryOptions entryId={id} />
          </footer>
        </div>
      </main>
    </div>
  );
}
