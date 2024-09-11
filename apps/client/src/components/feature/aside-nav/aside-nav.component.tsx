import { Hr } from "@/components/ui/hr";
import { AsideNavLinks } from "./components/navlinks";
import { ProfileCard } from "./components/profile-card";
import { EntrySearchModalTrigger } from "../entry-search-modal/search-entry-modal-trigger";
import { Command } from "lucide-react";
import { NewEntryBtn } from "./components/new-entry-btn";
import { MobileAsideView } from "./views/mobile";
import { DesktopAsideView } from "./views/desktop";

const VIEWS = {
  mobile: MobileAsideView,
  desktop: DesktopAsideView,
};

export function AsideNav() {
  return (
    <div className="bg-neutral-100">
      <div className="hidden lg:flex">
        <VIEWS.desktop>
          <MenuItems />
        </VIEWS.desktop>
      </div>
      <div className="lg:hidden border-b border-gray-200 p-2">
        <VIEWS.mobile>
          <MenuItems />
        </VIEWS.mobile>
      </div>
    </div>
  );
}

function MenuItems() {
  return (
    <ul className="w-full flex gap-2 flex-col items-center">
      <ProfileCard />
      <Hr orientation="horizontal" className="my-1" />
      <AsideNavLinks />
      <NewEntryBtn />
      <EntrySearchModalTrigger>
        <div className="w-full flex items-center p-2 gap-2 hover:bg-neutral-200 transition-all duration-150 rounded-sm font-semibold">
          <Command className="w-5 h-5" /> Search Entry
        </div>
      </EntrySearchModalTrigger>
    </ul>
  );
}
