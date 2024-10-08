import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import Link from "next/link";

import type { Metadata } from "next";
import { Document } from "./(components)/document";

export const metadata: Metadata = {
    title: "Entry - Memoir",
};

export default async function EntryPage({
    params: { id },
}: {
    params: { id: string };
}) {

    // await new Promise((resolve) => setTimeout(resolve, 123132))

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
            <main className="w-full relative flex justify-center w-full max-w-4xl py-10 px-3 lg:px-5">
                <Document entry={entry} />
            </main>
        </div>
    );
}
