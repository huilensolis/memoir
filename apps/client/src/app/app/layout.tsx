import { AsideNav } from "@/components/feature/aside-nav";
import { BannerMessage } from "@/components/feature/banner-message";
import { EntrySearchModalProvider } from "@/components/feature/entry-search-modal";
import { Suspense, type ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Suspense>
        <BannerMessage />
      </Suspense>
      <EntrySearchModalProvider />
      <div className="flex lg:flex-row flex-col items-start justify-start w-full">
        <div className="lg:max-w-80 w-full h-full lg:sticky top-0 left-0">
          <AsideNav />
        </div>
        <main className="w-full flex items-center justify-center lg:px-0 px-2">
          {children}
        </main>
      </div>
    </div>
  );
}
