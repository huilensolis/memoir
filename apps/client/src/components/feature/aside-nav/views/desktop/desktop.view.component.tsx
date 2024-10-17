import { Hr } from "@/components/ui/hr";
import { Suspense, type ReactNode } from "react";
import { EntryList } from "../../components/entry-list";
import { EntryListSkeleton } from "../../components/entry-list/entry-list-skeleton.component";

export function DesktopAsideView({ children }: { children: ReactNode }) {
  return (
    <>
      <aside className="max-w-80 w-full h-screen p-2 flex gap-2 flex-col items-center border-r border-neutral-200">
        {children}
        <Hr orientation="horizontal" className="my-1" />
        <Suspense fallback={<EntryListSkeleton />}>
          <EntryList />
        </Suspense>
      </aside>
    </>
  );
}
