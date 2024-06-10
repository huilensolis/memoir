"use client";

import { newEntry } from "@/actions/new-entry";
import { Spinner } from "@/components/ui/spinner";
import { ClientRoutingService } from "@/models/routing/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewEntryFunction() {
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
    >
      <button
        className="flex p-8 bg-neutral-50 border-2 border-zinc-200/40 rounded-md hover:border-zinc-300 transition-all duration-150"
        type="submit"
      >
        <article className="flex flex-col gap-16 justify-between">
          <section className="flex flex-col gap-8">
            <header className="w-full flex flex-col">
              {loading ? (
                <Spinner className="w-8 h-8" />
              ) : (
                <Plus className="w-8 h-8" />
              )}
            </header>
            <section>
              <h2 className="font-bold text-xl">New Entry</h2>
              <p>Create a new Document Entry from Scratch</p>
            </section>
          </section>
          <strong>Get Started</strong>
        </article>
      </button>
    </form>
  );
}
