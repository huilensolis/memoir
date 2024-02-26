import { AsideNav } from "@/components/feature/aside-nav";
import { type ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center w-full">
      <AsideNav />
      <main className="w-full flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
