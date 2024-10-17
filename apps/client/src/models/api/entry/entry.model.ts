import axios from "axios";
import { ApiService } from "../api.model";
import { ApiRoutingService } from "@/models/routing/api";
import type { TRawEntry, TNewEntry, TParsedEntry } from "@/types/entry";
import { CryptographyCustomApi } from "@/models/cryptography";
import { Base64Parser } from "@/models/base64-parser";

export class EntryService extends ApiService {
  constructor() {
    super();
  }

  public static async createNewEntry({
    title,
  }: {
    title: string;
  }): Promise<{ entryId: string | null; error: string | null }> {
    try {
      const newEntry: TParsedEntry = {
        title,

        // we define an empty document with a heading of level 1 that has the text of the title parameter
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
            },
          ],
        },
        word_count: title.length,
      };

      const cryptograhpyApi = new CryptographyCustomApi();

      const { iv, encryptedData } = await cryptograhpyApi.encrypt(
        JSON.stringify(newEntry),
      );

      const encryptedDataBase64 =
        Base64Parser.from_arraybuffer_to_base64(encryptedData);
      const ivBase64 = Base64Parser.from_arraybuffer_to_base64(iv);

      const { status, data } = await axios.post<{ id: string }, any, TNewEntry>(
        ApiRoutingService.routing.entry.createEntry,
        { data: encryptedDataBase64, iv: ivBase64 },
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
      return { entryId: null, error: JSON.stringify(error) };
    }
  }

  public static async readEntryById({
    entryId,
    cookie,
  }: {
    entryId: string;
    cookie?: string;
  }): Promise<{ entry: TRawEntry | null; error: string | null }> {
    try {
      const { status, data: response } = await axios.get<TRawEntry>(
        ApiRoutingService.routing.entry.readEntryById(entryId),
        {
          headers: {
            ...(cookie && { Cookie: cookie }),
          },
        },
      );

      if (status !== 200)
        throw new Error("Api has returned a status code different than 200");

      return { entry: response, error: null };
    } catch (error) {
      return { entry: null, error: JSON.stringify(error) };
    }
  }

  public static async getUserEntyList({
    signal,
    cookie,
  }: {
    signal?: AbortSignal;
    cookie?: string;
  }): Promise<{ entryList: TRawEntry[] | null; error: string | null }> {
    try {
      const { status, data } = await axios.get<TRawEntry[]>(
        ApiRoutingService.routing.entry.getEntryList,
        {
          ...(signal && { signal }),
          headers: {
            ...(cookie && { Cookie: cookie }),
          },
        },
      );

      if (status !== 200)
        throw new Error(
          `api was expected to return 200 status code, but returned ${status}`,
        );

      return { error: null, entryList: data };
    } catch (error) {
      return { error: JSON.stringify(error), entryList: null };
    }
  }

  public static async updateEntryById({
    entryId,
    entry,
    signal,
  }: {
    entryId: string;
    entry: Partial<TParsedEntry>;
    signal?: AbortSignal;
  }): Promise<{ error: string | null }> {
    try {
      const cryptographyApi = new CryptographyCustomApi();

      const { iv, encryptedData } = await cryptographyApi.encrypt(
        JSON.stringify(entry),
      );

      const ivInBase64 = Base64Parser.from_arraybuffer_to_base64(iv);

      const encryptedDataInBas64 =
        Base64Parser.from_arraybuffer_to_base64(encryptedData);

      const requestBody: TNewEntry = {
        iv: ivInBase64,
        data: encryptedDataInBas64,
      };

      const { status } = await axios.patch(
        ApiRoutingService.routing.entry.updateEntryById(entryId),
        requestBody,
        { signal },
      );

      if (status !== 204)
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

  public static async deleteEntryById({
    entryId,
  }: {
    entryId: TRawEntry["id"];
  }): Promise<{ error: string | null }> {
    try {
      const { status } = await axios.delete(
        ApiRoutingService.routing.entry.deleteById(entryId),
      );

      if (status !== 202)
        throw new Error(
          "expected status code of 200 but found" +
            " " +
            status +
            " " +
            " while trying to delete entry by id",
        );

      return { error: null };
    } catch (error) {
      return { error: "there has been an error deleting the entry" };
    }
  }
}
