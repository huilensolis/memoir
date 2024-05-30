import { Skeleton } from "@/components/ui/skeleton";

export default function EntryPageLoading() {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <header className="w-full max-w-2xl p-3 flex justify-end">
        <Skeleton className="w-24 h-6 rounded-sm" />
      </header>
      <main className="py-10 w-full h-full max-w-2xl">
        <Skeleton className="w-80 h-10 rounded-md mb-10" />
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-72 h-4 rounded-md" />
            <Skeleton className="w-80 h-4 rounded-md" />
            <Skeleton className="w-64 h-4 rounded-md" />
            <Skeleton className="w-96 h-4 rounded-md" />
            <Skeleton className="w-72 h-4 rounded-md" />
            <Skeleton className="w-80 h-4 rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-7/12 h-4 rounded-md" />
            <Skeleton className="w-8/12 h-4 rounded-md" />
            <Skeleton className="w-6/12 h-4 rounded-md" />
            <Skeleton className="w-7/12 h-4 rounded-md" />
            <Skeleton className="w-8/12 h-4 rounded-md" />
            <Skeleton className="w-9/12 h-4 rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-6/12 h-4 rounded-md" />
            <Skeleton className="w-8/12 h-4 rounded-md" />
            <Skeleton className="w-5/12 h-4 rounded-md" />
            <Skeleton className="w-7/12 h-4 rounded-md" />
            <Skeleton className="w-9/12 h-4 rounded-md" />
            <Skeleton className="w-8/12 h-4 rounded-md" />
          </div>
        </div>
      </main>
    </div>
  );
}
