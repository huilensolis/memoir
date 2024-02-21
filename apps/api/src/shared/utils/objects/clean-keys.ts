export function cleanKeysWithEmptyValue<T>(object: Record<string, unknown>): T {
  const cleanObject = {} as T;

  for (const key of Object.keys(object)) {
    const value = object[key] as T[keyof T];

    if (value !== null && value !== undefined) {
      cleanObject[key as keyof T] = value;
    }
  }

  return cleanObject;
}
