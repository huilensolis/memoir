import { WithUserNotAuthenticated } from "@/components/wrappers/protect-from-authenticated-users";
import { ClientRoutingService } from "@/models/routing/client";
import { type ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WithUserNotAuthenticated redirectUrl={ClientRoutingService.app.home}>
      <div className="grid xl:grid-cols-[1fr_2fr] grid-cols-1 grid-rows-1 items-center justify-center w-full h-screen">
        <section className="flex flex-col items-center justify-center h-full w-full py-5 px-5">
          {children}
        </section>
        <section className="w-full h-full xl:flex xl:items-center xl:justify-center hidden relative max-h-screen bg-neutral-950">
          <h2 className="text-balance text-neutral-200 font-bold text-5xl max-w-2xl w-full">
            Start taking notes without distractions. focus in writting, not in
            the tool.
          </h2>
        </section>
      </div>
    </WithUserNotAuthenticated>
  );
}
