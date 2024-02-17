import { Sparkles } from "lucide-react";

export function ProfileCard() {
  return (
    <article className="w-full flex gap-2 items-center p-1 font-bold text-neutral-800 bg-purple-100 border border-neutral-300 rounded-md text-">
      <div className="bg-purple-600 border border-gray-400 flex items-center rounded-md p-1">
        <Sparkles className="h-7 w-7 text-neutral-50" />
      </div>
      <section className="flex flex-col justify-center">
        <h4 className="">Huilen Solis</h4>
        <span className="font-semibold text-sm text-neutral-500">
          huilensolis@skiff.com
        </span>
      </section>
    </article>
  );
}
