interface FetcherReturn<T> {
  data: T | null;
  error: Error | null;
}

export class Fetcher {
  protected static fetcher() {
    return {
      async post<T>({
        url,
        body = {},
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

          if (!res.ok) {
            throw new Error("error on post request");
          }

          const bodyData: T = await res.json();

          return { data: bodyData, error: null };
        } catch (error) {
          console.log("on catch");
          return { data: null, error: error as Error };
        }
      },
      async put({
        url,
        body,
      }: {
        url: string;
        body: Object;
      }): Promise<{ error: Error | null }> {
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; utf8",
            },
            body: JSON.stringify(body),
          });

          if (!res.ok) {
            throw new Error("error on post request");
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },
      async get<T>({
        url,
        headers = {},
      }: {
        url: string;
        headers?: Record<string, string>;
      }): Promise<FetcherReturn<T>> {
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; utf8",
              ...headers,
            },
          });

          if (!res.ok) {
            throw new Error("error on post request");
          }

          const body: T = await res.json();

          return { data: body, error: null };
        } catch (error) {
          console.log({ error });
          return { data: null, error: error as Error };
        }
      },
      async delete({ url }: { url: string }): Promise<{ error: Error | null }> {
        try {
          const res = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; utf8",
            },
          });

          if (!res.ok) {
            throw new Error("error on post request");
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },
    };
  }
}
