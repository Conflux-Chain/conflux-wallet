export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key)
}
