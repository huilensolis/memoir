"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/modal";
import { EntryService } from "@/models/api/entry";
import { ClientRoutingService } from "@/models/routing/client";
import { Entry } from "@/types/entry";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export function DeleteEntryModalTrigger({
  children,
  entryId,
}: {
  children: ReactNode;
  entryId: Entry["id"];
}) {
  const [loading, setLoading] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  async function deleteEntry() {
    try {
      setLoading(true);

      const { error } = await EntryService.deleteEntryById({ entryId });

      if (error) {
        throw new Error(error as string);
      }

      if (pathName === ClientRoutingService.app.entries.readById(entryId)) {
        router.push(ClientRoutingService.app.home);
        return;
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Entry</AlertDialogTitle>
          <AlertDialogDescription>
            This will not delete the entry permantently, but momentaniously.
            <br />
            You can resotre it on the next 30 days{" "}
            <Link href="" className="underline text-blue-600">
              here (not implemented yet)
            </Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteEntry} disabled={loading}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
