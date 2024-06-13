import { AuthBtns } from "./auth-btns";

export default function Home() {
  return (
    <div className="w-full max-w-2xl">
      <nav className="w-full items-center justify-end flex gap-2">
        <AuthBtns />
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
