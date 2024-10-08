"use client";

import { Spinner } from "@/components/ui/spinner";
import { EntryService } from "@/models/api/entry";
import { ClientRoutingService } from "@/models/routing/client";
import { PenTool } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewEntryBtn() {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    async function onSubmit() {
        setLoading(true);

        const { error, entryId } = await EntryService.createNewEntry({ title: 'Untitled' });

        if (error || !entryId) {
            const url = `${ClientRoutingService.app.home}?message=There has been an error, we could not create the new entry`;

            router.push(url);

            setLoading(false);

            return;
        }

        const url = ClientRoutingService.app.entries.readById(entryId);

        router.refresh();
        router.push(url);

        setLoading(false);
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                onSubmit();
            }}
            className="w-full"
        >
            <button
                className="flex items-center w-full gap-2 py-2 px-2 rounded-sm text-md font-semibold hover:bg-neutral-200 transition-all duration-75"
                type="submit"
            >
                {loading ? <Spinner /> : <PenTool className="w-5 h-5" />}
                New Entry
            </button>
        </form>
    );
}
