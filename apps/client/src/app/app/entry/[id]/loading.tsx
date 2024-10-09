import { Skeleton } from "@/components/ui/skeleton";

export default function EntryPageLoading() {
    return (
            <div className="w-full h-full flex flex-col gap-3">
                <Skeleton className="w-80 h-10 rounded-md" />
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
            </div>
    );
}
