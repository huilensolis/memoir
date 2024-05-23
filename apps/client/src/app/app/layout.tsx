import { AsideNav } from "@/components/feature/aside-nav";
import { BannerMessage } from "@/components/feature/banner-message";
import { type ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <BannerMessage />
      <div className="flex items-start justify-start w-full">
        <div className="max-w-80 w-full h-full sticky top-0 left-0">
          <AsideNav />
        </div>
        <main className="w-full flex items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
