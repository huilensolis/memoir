"use client";

import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../../../drawer";
import { Button } from "@/components/ui/button";
import { useAsideNavStore } from "../../store";
import { type ReactNode, useEffect, useState } from "react";

export function MobileAsideView({ children }: { children: ReactNode }) {
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
    <>
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
          <DrawerFooter>{children}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
