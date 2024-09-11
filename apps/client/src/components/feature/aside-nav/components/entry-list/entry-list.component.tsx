import { EntryService } from "@/models/api/entry";
import { EntryItem } from "./entry-item.component";
import { getCookie } from "@/utils/getCookies";

export async function EntryList() {
  const { cookie } = getCookie();

  if (!cookie) return <p>something went wrong</p>;

  const { entryList, error } = await EntryService.getUserEntyList({ cookie });

  return (
    <ul className="w-full flex flex-col gap-2">
      {!error &&
        entryList &&
        entryList.length > 0 &&
        entryList
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
