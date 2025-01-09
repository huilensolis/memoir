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
    const [isLoading, setIsloading] = useState<boolean>(true)
  const [decryptedData, setDecryptedData] = useState<TParsedEntry | null>(null);
  const [clientDocumentData, setClientDocumentData] =
    useState<TParsedEntry | null>(null);

  const setEntryState = useEntryStore((state) => state.setState);

  const router = useRouter();

  useEffect(() => {
    async function decryptData() {
      try {
                setIsloading(true)
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
      } finally {
        setIsloading(false)
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

        if(clientDocumentData === null) return

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
      {decryptedData && 
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
            }
            {isLoading && 
                <EntryPageLoading />
            }
            {!isLoading && !decryptedData && <article className="flex flex-col">
                <h1 className="text-2xl font-semibold">Entry Encrypted</h1>
                <br/>
                <p>Why am I seeing this issue? <br /> This entry could not be decrypted because your encryption key doesnt match the key that was used to encrypt it.</p>
                <br />
                <p>How can I fix this issue? <br /> log out, log in again and input an encryption key that matches the one that was used to encrypt this entry.</p>
            </article>}
      <footer className="fixed bottom-0 lg:left-80 left-0 w-full">
        <EntryOptions entryId={entry.id} />
      </footer>
    </>
  );
}
