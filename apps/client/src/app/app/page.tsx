import { EntrySearchModalTrigger } from "@/components/feature/entry-search-modal/search-entry-modal-trigger";
import { ClientRoutingService } from "@/models/routing/client";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function AppPage() {
  return (
    <main className="w-full min-h-screen p-2 flex items-center justify-center bg-neutral-100">
      <ul className="grid lg:grid-cols-2 gap-8">
        <li>
          <Link
            href={ClientRoutingService.app.entries.create}
            className="flex p-8 bg-neutral-50 border-2 border-zinc-200/40 rounded-md hover:border-zinc-300 transition-all duration-150"
          >
            <article className="flex flex-col gap-16 justify-between">
              <section className="flex flex-col gap-8">
                <header className="w-full flex flex-col">
                  <Plus className="w-8 h-8" />
                </header>
                <section>
                  <h2 className="font-bold text-xl">New Entry</h2>
                  <p>Create a new Document Entry from Scratch</p>
                </section>
              </section>
              <strong>Get Started</strong>
            </article>
          </Link>
        </li>
        <li>
          <EntrySearchModalTrigger>
            <article className="flex flex-col justify-between gap-16 p-8 bg-neutral-50 border-2 border-zinc-200/40 rounded-md text-start hover:border-zinc-300 transition-all duration-150">
              <section className="flex flex-col gap-8">
                <header className="w-full flex flex-col">
                  <Search className="w-8 h-8" />
                </header>
                <section>
                  <h2 className="font-bold text-xl">Search Entry</h2>
                  <p>Search and find existing Document Entries</p>
                </section>
              </section>
              <strong>Search</strong>
            </article>
          </EntrySearchModalTrigger>
        </li>
      </ul>
    </main>
  );
}
