"use client";

import { newEntry } from "@/actions/new-entry";
import { Spinner } from "@/components/ui/spinner";
import { ClientRoutingService } from "@/models/routing/client";
import { PenTool } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewEntryBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit() {
    setLoading(true);

    const { error, newEntryId } = await newEntry();

    if (error || !newEntryId) {
      const url = `${ClientRoutingService.app.home}?message=There has been an error, we could not create the new entry`;

      router.push(url);

      setLoading(false);

      return;
    }

    const url = ClientRoutingService.app.entries.readById(newEntryId);

    router.push(url);

    setLoading(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full"
    >
      <button
        className="flex items-center w-full gap-2 py-2 px-2 rounded-md text-md font-semibold hover:bg-zinc-200 transition-all duration-75"
        type="submit"
      >
        {loading ? <Spinner /> : <PenTool className="w-5 h-5" />}
        New Entry
      </button>
    </form>
  );
}
