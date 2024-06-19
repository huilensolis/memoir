import { ClientRoutingService } from "@/models/routing/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <h1 className="font-semibold text-2xl">404 - Not Found</h1>
      <Link
        href={ClientRoutingService.app.home}
        className="flex items-center text-blue-600"
      >
        Go back to app
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
