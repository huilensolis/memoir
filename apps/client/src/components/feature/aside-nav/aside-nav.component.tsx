"use client";

import { Hr } from "@/components/ui/hr";
import { AsideNavLinks } from "./components/navlinks";
import { ProfileCard } from "./components/profile-card";
import { EntrySearchModalTrigger } from "../entry-search-modal/search-entry-modal-trigger";
import { Command, Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../drawer";
import { Button } from "@/components/ui/button";
import { useAsideNavStore } from "./store";
import { useEffect, useState } from "react";
import { NewEntryBtn } from "./components/new-entry-btn";

export function AsideNav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const canDrawerOpen = useAsideNavStore((state) => state.canDrawerOpen);
  const closeDrawer = useAsideNavStore((state) => state.closeDrawer);
  const openDrawer = useAsideNavStore((state) => state.openDrawer);

  function handleDrawerOpenChange(open: boolean) {
    setIsDrawerOpen(open);
  }

  function handleFocusOnDrawerBackground() {
    closeDrawer();

    setTimeout(() => {
      openDrawer();
    }, 500);
  }

  useEffect(() => {
    if (!isDrawerOpen) return;

    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

    return () => {
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

  return (
    <div className="bg-zinc-100">
      <div className="hidden lg:flex">
        <aside className="max-w-80 w-full h-full min-h-screen p-2 flex gap-2 flex-col items-center border-r border-neutral-300">
          <MenuItems />
        </aside>
      </div>
      <div className="lg:hidden bg-zinc-100 border-b border-gray-200 p-2">
        {isDrawerOpen && (
          <div
            onClick={(e) => {
              e.stopPropagation();

              handleFocusOnDrawerBackground();
            }}
            className="h-screen w-full bg-black/40 absolute top-0 left-0 z-40"
          ></div>
        )}
        <Drawer
          open={canDrawerOpen ? undefined : false}
          modal={false}
          onOpenChange={handleDrawerOpenChange}
        >
          <DrawerTrigger asChild>
            <Button variant="ghost" className="hover:bg-zinc-200 px-1.5">
              <Menu className="h-8 w-8" />
            </Button>
          </DrawerTrigger>
          <DrawerContent hidden={!canDrawerOpen}>
            <DrawerHeader className="flex items-center justify-start">
              <DrawerClose asChild>
                <Button variant="ghost" className="px-1.5">
                  <X className="h-8 w-8" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <DrawerFooter>
              <MenuItems />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
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
      <Hr orientation="horizontal" className="my-1" />
      <NewEntryBtn />
      <EntrySearchModalTrigger>
        <div className="w-full flex items-center p-2 gap-2 hover:bg-zinc-200 transition-all duration-150 rounded-md font-semibold">
          <Command className="w-5 h-5" /> Search Entry
        </div>
      </EntrySearchModalTrigger>
    </ul>
  );
}
