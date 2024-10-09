'use client'

import { useEffect, useState } from "react";
import { EntryItem } from "./entry-item.component";
import { type TParsedEntry, type TRawEntry } from "@/types/entry";
import { CryptographyCustomApi } from "@/models/cryptography";
import { Base64Parser } from "@/models/base64-parser";

type TEntryItem = Pick<TRawEntry, 'id' | 'updated_at' | 'created_at'> & Pick<TParsedEntry, 'title'>;

export function DecryptedEntryList({ entryList }: { entryList: TRawEntry[] }) {
    const [decryptedEntryList, setDecryptedEntryList] = useState<TEntryItem[]>([])
    const [error, setError] = useState<boolean>(false)


    useEffect(() => {

        async function decryptEntryItems() {
            const cryptographyApi = new CryptographyCustomApi()

            const decryptedEntryList = await Promise.all(entryList.map(async (encryptedEntry) => {

                const ivArrayBuffer = Base64Parser.from_base64_to_arraybuffer(encryptedEntry.iv)
                const dataArrayBuffer = Base64Parser.from_base64_to_arraybuffer(encryptedEntry.data)

                try {
                    const decryptedEntry = await cryptographyApi.decrypt({ iv: ivArrayBuffer, encryptedData: dataArrayBuffer })

                    const parsedDecryptedEntry: TParsedEntry = JSON.parse(decryptedEntry)

                    const entryItem: TEntryItem = { created_at: encryptedEntry.created_at, title: parsedDecryptedEntry.title, updated_at: encryptedEntry.created_at, id: encryptedEntry.id }

                    return entryItem
                } catch (error) {
                    throw new Error('error decrypting entry item')
                }
            }))



            setDecryptedEntryList(decryptedEntryList)
        }

        decryptEntryItems()
    }, [entryList])


    return (
        <ul className="w-full flex flex-col gap-2">
            {!error &&
                decryptedEntryList &&
                decryptedEntryList.length > 0 &&
                decryptedEntryList
                    .sort((entry, nextEntry) =>
                        new Date(entry.updated_at).getTime() >
                            new Date(nextEntry.updated_at).getTime()
                            ? -1
                            : 1,
                    )
                    .map((entry) => (
                        <li key={entry.id}>
                            <EntryItem entry={entry} />
                        </li>
                    ))}
            {error && <p>something went wrong</p>}
        </ul>
    );
}
