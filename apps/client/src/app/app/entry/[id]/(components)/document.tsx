"use client";

import type { TParsedEntry, TRawEntry } from "@/types/entry";
import { useEffect, useState } from "react";
import { EntryTitle } from "./entry-title/entry-title.component";
import { EntryEditor } from "./entry-editor/entry-editor.component";
import { EntryOptions } from "./entry-options/entry-options.component";
import { CryptographyCustomApi } from "@/models/cryptography";
import { Base64Parser } from "@/models/base64-parser";
import { useEntryStore } from "../(store)/entry-store";
import { EntryService } from "@/models/api/entry";
import EntryPageLoading from "../loading";
import { cleanCache } from "@/actions/clean-cache";
import { ClientRoutingService } from "@/models/routing/client";
import { useRouter } from "next/navigation";

export function Document({ entry }: { entry: TRawEntry }) {
  const [decryptedData, setDecryptedData] = useState<TParsedEntry | null>(null);
  const [clientDocumentData, setClientDocumentData] =
    useState<TParsedEntry | null>(null);

  const setEntryState = useEntryStore((state) => state.setState);

  const router = useRouter();

  useEffect(() => {
    async function decryptData() {
      try {
        const cryptographyApi = new CryptographyCustomApi();

        const ivBuffer = Base64Parser.from_base64_to_arraybuffer(entry.iv);
        const dataBuffer = Base64Parser.from_base64_to_arraybuffer(entry.data);

        const decryptedData = await cryptographyApi.decrypt({
          iv: ivBuffer,
          encryptedData: dataBuffer,
        });

        const parsedDecryptedData: TParsedEntry = JSON.parse(decryptedData);

        setDecryptedData(parsedDecryptedData);
        setClientDocumentData(parsedDecryptedData);
      } catch (error) {
        console.log({ error });

        setDecryptedData(null);
        setClientDocumentData(null);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    decryptData();
  }, [entry]);

  useEffect(() => {
    async function updateDocument({ signal }: { signal: AbortSignal }) {
      setEntryState("saving");

      const updatedEntry: Partial<TParsedEntry> = {
        ...clientDocumentData,
      };

      await EntryService.updateEntryById({
        entryId: entry.id,
        entry: updatedEntry,
        signal,
      });

      setEntryState("up to date");

      if (clientDocumentData?.title !== decryptedData?.title) {
        await cleanCache(ClientRoutingService.app.home, "layout");
        router.refresh();
      }
    }

    const ctrl = new AbortController();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateDocument({ signal: ctrl.signal });

    return () => {
      ctrl.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientDocumentData, entry.id]);

  function updateTitle(title: string) {
    if (decryptedData === null) return;
    if (clientDocumentData === null) return;

    setClientDocumentData({ ...clientDocumentData, title });
  }

  function updateContent(content: TParsedEntry["content"]) {
    if (decryptedData === null) return;
    if (clientDocumentData === null) return;

    setClientDocumentData({ ...clientDocumentData, content });
  }

  return (
    <>
      {decryptedData ? (
        <div className="flex flex-col gap-3 w-full h-full">
          <header className="flex flex-col">
            <EntryTitle
              entryId={entry.id}
              defaultValue={decryptedData.title ?? ""}
              onUpdateTitle={updateTitle}
            />
          </header>
          <EntryEditor
            initialContent={decryptedData.content}
            entry={entry}
            onUpdate={updateContent}
          />
        </div>
      ) : (
        <EntryPageLoading />
      )}
      <footer className="fixed bottom-0 lg:left-80 left-0 w-full">
        <EntryOptions entryId={entry.id} />
      </footer>
    </>
  );
}
