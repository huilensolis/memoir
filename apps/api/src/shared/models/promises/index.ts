type TSuccessfulReturn<D> = {
  error: null;
  data: D;
};

type TFailedReturn<E> = {
  data: null;
  error: E;
};

/**
 * @param D data return type
 * @param E error return type
 */
export type TReturnHanler<D, E> = TSuccessfulReturn<D> | TFailedReturn<E>;
