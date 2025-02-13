type CacheItem<T> = {
    data: T;
    expiry: number;
  };
  
  class MemoryCache {
    private cache: Map<string, CacheItem<any>> = new Map();
  
    set<T>(key: string, value: T, ttl: number): void {
      const expiry = Date.now() + ttl * 1000;
      this.cache.set(key, { data: value, expiry });
    }
  
    get<T>(key: string): T | null {
      const item = this.cache.get(key);
      if (!item) return null;
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }
      return item.data;
    }
  
    delete(key: string): void {
      this.cache.delete(key);
    }
  }
  
  export const memoryCache = new MemoryCache();
  