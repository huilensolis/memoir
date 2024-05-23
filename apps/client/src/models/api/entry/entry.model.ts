import axios from "axios";
import { ApiService } from "../api.model";
import { ApiRoutingService } from "@/models/routing/api";
import { Entry, NewEntry } from "@/types/entry";

export class EntryService extends ApiService {
  constructor() {
    super();
  }

  public static async createNewEntry({
    title,
    cookie,
  }: {
    title: string;
    cookie?: string;
  }): Promise<{ entryId: string | null; error: string | null }> {
    try {
      const newEntry: NewEntry = {
        title,

        // we define an empty document with a heading of level 1 that has the text of the title parameter
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: "text",
                  text: title,
                },
              ],
            },
          ],
        },
        word_count: title.length,
      };

      const { status, data } = await axios.post<{ id: string }, any, NewEntry>(
        ApiRoutingService.routing.entry.createEntry,
        newEntry,
        {
          headers: {
            ...(cookie && { Cookie: cookie }),
          },
        },
      );

      if (status !== 201) {
        return { error: "there has been an error", entryId: null };
      }

      const { id } = data;

      if (!id) {
        return {
          error: "no entry id found in api response body",
          entryId: null,
        };
      }

      return { entryId: id, error: null };
    } catch (error) {
      console.log({ error });

      return { entryId: null, error: JSON.stringify(error) };
    }
  }

  public static async readEntryById({
    entryId,
    cookie,
  }: {
    entryId: string;
    cookie?: string;
  }): Promise<{ entry: Entry | null; error: string | null }> {
    try {
      const { status, data } = await axios.get<Entry>(
        ApiRoutingService.routing.entry.readEntryById(entryId),
        {
          headers: {
            ...(cookie && { Cookie: cookie }),
          },
        },
      );

      if (status !== 200)
        throw new Error("Api has returned a status code different than 200");

      return { entry: data, error: null };
    } catch (error) {
      return { entry: null, error: JSON.stringify(error) };
    }
  }

  public static async updateEntryById({
    entryId,
    entry,
    signal,
  }: {
    entryId: string;
    entry: NewEntry;
    signal?: AbortSignal;
  }): Promise<{ error: string | null }> {
    try {
      const { status } = await axios.patch(
        ApiRoutingService.routing.entry.updateEntryById(entryId),
        entry,
        { signal },
      );

      if (status !== 201)
        throw new Error(
          "api was expected to return status code of 201 but returned:" +
            " " +
            status +
            " " +
            "while trying to update entry",
        );

      return { error: null };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }
}
