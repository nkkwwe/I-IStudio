const key = 'ii_studio_verde_demo_bag_v1';
const productIds = new Set(['ficus', 'succulent', 'garden-kit', 'quiet-corner']);
export function sanitizeDemoBag(value: unknown): Record<string, number> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, count]) => productIds.has(id) && typeof count === 'number' && Number.isInteger(count) && count > 0 && count <= 10));
}
export function readDemoBag(): Record<string, number> {
  try { return sanitizeDemoBag(JSON.parse(window.localStorage.getItem(key) ?? '{}')); } catch { return {}; }
}
export function saveDemoBag(bag: Record<string, number>) {
  try { const next = JSON.stringify(sanitizeDemoBag(bag)); if (window.localStorage.getItem(key) !== next) window.localStorage.setItem(key, next); } catch { /* The demo continues in memory when storage is unavailable. */ }
}
export const demoBagStorageKey = key;
