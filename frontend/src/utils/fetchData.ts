export async function fetchData<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const res = await window.fetch(input, init);

  if (!res.ok) throw new Error(`Error ${res.status} (${res.statusText})`);

  return res.json() as Promise<T>;
}
