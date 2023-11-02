export function useLocalStorage(name: string) {
  const value = localStorage.getItem(name);
  if (!value) return null;
  return JSON.parse(value);
}
