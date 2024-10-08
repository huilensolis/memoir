import { EntryService } from "@/models/api/entry";
import { getCookie } from "@/utils/getCookies";
import { DecryptedEntryList } from "./decrypted-entry-list.component";

export async function EntryList() {
    const { cookie } = getCookie();

    if (!cookie) return <p>something went wrong </p>;

    const { entryList } = await EntryService.getUserEntyList({ cookie });


    return (
        <ul className="w-full flex flex-col gap-2" > <DecryptedEntryList entryList={entryList ?? []} /> </ul>);
}
