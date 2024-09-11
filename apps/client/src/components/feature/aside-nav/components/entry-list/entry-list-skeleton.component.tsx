import { Skeleton } from "@/components/ui/skeleton";

export function EntryListSkeleton() {
  return (
    <ul className="w-full flex flex-col gap-2">
      {Array(9)
        .fill("")
        .map((_, index) => (
          <li key={index} className="flex flex-col p-2 gap-2">
            <Skeleton
              className={`${index % 2 === 0 ? "w-44" : "w-24"} h-4 rounded-md`}
            />
            <Skeleton className="w-36 h-3 rounded-md" />
          </li>
        ))}
    </ul>
  );
}
