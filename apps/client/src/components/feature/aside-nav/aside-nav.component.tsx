import { SignOutBtn } from "../auth/sign-out";
import { AsideNavLinks } from "./components/navlinks";

export async function AsideNav() {
  return (
    <aside className="max-w-80 w-full h-full min-h-screen p-2 flex flex-col items-center bg-zinc-100">
      user profile
      <AsideNavLinks />
      <SignOutBtn />
    </aside>
  );
}
