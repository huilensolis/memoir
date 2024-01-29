export interface FetcherReturn<T> {
  data: T | null;
  error: Error | null;
}
