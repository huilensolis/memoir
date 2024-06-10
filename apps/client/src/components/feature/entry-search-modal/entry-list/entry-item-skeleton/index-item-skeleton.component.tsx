import { Skeleton } from "@/components/ui/skeleton";

export function EntryItemSkeleton() {
  return (
    <article className="w-full flex px-2 py-1.5 gap-2 items-center">
      <Skeleton className="w-5 h-5 rounded-sm" />
      <div className="flex flex-col gap-2">
        <Skeleton
          className={`${Math.random() * 10 > 4 ? "w-44" : Math.random() * 10 > 4 ? "w-32" : "w-52"} h-3 rounded-md`}
        />
        <Skeleton className="w-24 h-3 rounded-md" />
      </div>
    </article>
  );
}
