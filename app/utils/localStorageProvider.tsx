import { Cache } from "swr"

export function localStorageProvider(): Cache {
  if (typeof window === 'undefined') {
    // Return an empty map if running on the server
    return new Map();
  }

  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<string, object>(
    JSON.parse(localStorage.getItem('app-cache') || '[]')
  );

  // Function to save the map to localStorage
  const saveToLocalStorage = () => {
    try {
      const appCache = JSON.stringify(Array.from(map.entries()));
      localStorage.setItem('app-cache', appCache);
    } catch (error) {
      console.error('Failed to save cache to localStorage:', error);
    }
  };

  // Use pagehide event for better compatibility with mobile browsers
  window.addEventListener('pagehide', saveToLocalStorage);

  // We still use the map for write & read for performance.
  return map;
}