import { Skeleton } from "@/components/ui/skeleton";

export function EntryItemSkeleton() {
  return (
    <article>
      <Skeleton className="w-24 h-3 rounded-md" />
    </article>
  );
}
