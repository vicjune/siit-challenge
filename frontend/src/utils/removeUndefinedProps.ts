export function removeUndefinedProps<T extends object>(
  obj: T,
): Partial<T> | undefined {
  const validEntries = Object.entries(obj).filter(
    ([, value]) => value !== undefined,
  );

  if (validEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(validEntries) as Partial<T>;
}
