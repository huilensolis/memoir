import { AsideNav } from "@/components/feature/aside-nav";
import { BannerMessage } from "@/components/feature/banner-message";
import { EntrySearchModalProvider } from "@/components/feature/entry-search-modal";
import { Suspense, type ReactNode } from "react";
import { CheckForClientKeys } from "./(components)/check-for-keys";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <EntrySearchModalProvider />
      <CheckForClientKeys />
      <div className="flex flex-col w-full min-h-screen bg-neutral-50">
        <Suspense>
          <BannerMessage />
        </Suspense>
        <div className="flex lg:flex-row flex-col items-start justify-start w-full">
          <div className="lg:max-w-80 w-full h-full lg:sticky top-0 left-0">
            <AsideNav />
          </div>
          <main className="w-full flex items-center justify-center lg:px-0 px-2">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
