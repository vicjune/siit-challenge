const CACHE_NAME = 'fetch-cache';

const deteleCache = () => {
  if (window.caches) {
    window.caches.delete(CACHE_NAME);
  }
};

deteleCache();

export async function fetchAndCache(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const cache = await caches.open(CACHE_NAME);
  const cacheResponse = await cache.match(input);

  if (cacheResponse) return cacheResponse;

  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Error ${response.status} (${response.statusText})`);
  }

  cache.put(input, response.clone());

  return response;
}
