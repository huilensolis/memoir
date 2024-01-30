import type { FetcherReturn } from "./fetcher.models";

export class Fetcher {
  protected static fetcher() {
    return {
      async post<T>({
        url,
        body,
      }: {
        url: string;
        body: Object;
      }): Promise<FetcherReturn<T>> {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; utf8",
            },
            body: JSON.stringify(body),
          });
          const bodyData: T = await res.json();

          return { data: bodyData, error: null };
        } catch (error) {
          return { data: null, error: error as Error };
        }
      },
      async put({ url, body }: { url: string; body: Object }): Promise<void> {
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; utf8",
            },
            body: JSON.stringify(body),
          });

          if (!res.ok) {
            return Promise.reject();
          } else throw new Error("error on put request");
        } catch (error) {
          return Promise.reject();
        }
      },
      async get<T>({ url }: { url: string }): Promise<FetcherReturn<T>> {
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; utf8",
            },
          });

          if (!res.ok) {
            return Promise.reject();
          }

          const body: T = await res.json();

          return { data: body, error: null };
        } catch (error) {
          return { data: null, error: error as Error };
        }
      },
      async delete({ url }: { url: string }): Promise<void> {
        try {
          const res = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; utf8",
            },
          });

          if (!res.ok) {
            return Promise.reject();
          }

          return Promise.resolve();
        } catch (error) {
          return Promise.reject();
        }
      },
    };
  }
}
