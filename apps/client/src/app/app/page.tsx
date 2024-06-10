import { EntrySearchModalTrigger } from "@/components/feature/entry-search-modal/search-entry-modal-trigger";
import { Search } from "lucide-react";
import { NewEntryFunction } from "./new-entry-btn";

export default function AppPage() {
  return (
    <main className="w-full min-h-screen p-2 flex items-center justify-center bg-neutral-100">
      <ul className="grid lg:grid-cols-2 gap-8">
        <li>
          <NewEntryFunction />
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
