import { Hr } from "@/components/ui/hr";
import { AsideNavLinks } from "./components/navlinks";
import { ProfileCard } from "./components/profile-card";
import { EntrySearchModalTrigger } from "../entry-search-modal/search-entry-modal-trigger";
import { Command } from "lucide-react";

export async function AsideNav() {
  return (
    <aside className="max-w-80 w-full h-full min-h-screen p-2 flex gap-2 flex-col items-center bg-zinc-100 border-r border-neutral-300">
      <ProfileCard />
      <Hr orientation="horizontal" className="my-1" />
      <AsideNavLinks />
      <Hr orientation="horizontal" className="my-1" />
      <EntrySearchModalTrigger>
        <div className="w-full flex items-center p-2 gap-2 hover:bg-zinc-200 transition-all duration-150 rounded-md font-semibold">
          <Command className="w-5 h-5" /> Search Entry
        </div>
      </EntrySearchModalTrigger>
    </aside>
  );
}
