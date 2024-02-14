import { SignOutBtn } from "@/components/feature/auth/sign-out";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center w-full">
      <aside className="max-w-96 w-full p-1">
        <SignOutBtn />
      </aside>
      <main className="w-full flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
