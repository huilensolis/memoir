export type PromiseReturnHanler<T, E> = Promise<{
	data: T | null;
	error: E | null;
}>;
