
/**
 * LRU cache (least recently used)
 * Source: https://stackoverflow.com/a/46432113
 */
export class LRUCache<T> {
  private readonly max: number;
  private readonly cache: Map<string, T>;

  constructor(max = 10) {
    this.max = max;
    this.cache = new Map();
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (item) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: string, val: T) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      this.cache.delete(this.first());
    }
    this.cache.set(key, val);
  }

  private first() {
    // This works because the Map class maintains ordered keys.
    return this.cache.keys().next().value;
  }
}