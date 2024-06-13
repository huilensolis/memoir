import { Suspense } from "react";
import { AuthBtns } from "./auth-btns";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <div className="w-full max-w-2xl">
      <nav className="w-full items-center justify-end flex gap-2">
        <Suspense
          fallback={
            <div className="flex items-center gap-1 p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700">
              Authenticating
              <Spinner className="w-4 h-4" />
            </div>
          }
        >
          <AuthBtns />
        </Suspense>
      </nav>
      <article className="flex flex-col w-full items-center justify-center py-80">
        <h1 className="text-balance text-center text-neutral-700 font-bold text-5xl max-w-2xl w-full">
          Build a journaling habit and document your dreams, reflections,
          experiences, mood and memories.
        </h1>
      </article>
    </div>
  );
}
