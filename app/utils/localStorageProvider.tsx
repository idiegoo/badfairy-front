import { Cache } from "swr"

export function localStorageProvider(): Cache {
  if (typeof window === 'undefined') {
    // Return an empty map if running on the server
    return new Map();
  }
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<string, object>(
    JSON.parse(localStorage.getItem('app-cache') || '[]')
)
  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}