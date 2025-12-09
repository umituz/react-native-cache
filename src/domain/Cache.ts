/**
 * In-Memory Cache
 */

import type { CacheEntry, CacheConfig, CacheStats, EvictionStrategy } from './types/Cache';

export class Cache<T = unknown> {
  private store = new Map<string, CacheEntry<T>>();
  private config: Required<CacheConfig>;
  private stats: CacheStats = {
    size: 0,
    hits: 0,
    misses: 0,
    evictions: 0,
    expirations: 0,
  };

  constructor(config: CacheConfig = {}) {
    this.config = {
      maxSize: config.maxSize || 100,
      defaultTTL: config.defaultTTL || 5 * 60 * 1000, // 5 minutes
      onEvict: config.onEvict || (() => {}),
      onExpire: config.onExpire || (() => {}),
    };
  }

  set(key: string, value: T, ttl?: number): void {
    if (this.store.size >= this.config.maxSize && !this.store.has(key)) {
      this.evictOne('lru');
    }

    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL,
      accessCount: 0,
      lastAccess: Date.now(),
    };

    this.store.set(key, entry);
    this.stats.size = this.store.size;
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);

    if (!entry) {
      this.stats.misses++;
      return undefined;
    }

    if (this.isExpired(entry)) {
      this.delete(key);
      this.stats.misses++;
      this.stats.expirations++;
      this.config.onExpire(key, entry);
      return undefined;
    }

    entry.accessCount++;
    entry.lastAccess = Date.now();
    this.stats.hits++;
    return entry.value;
  }

  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;
    if (this.isExpired(entry)) {
      this.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
    this.stats = {
      size: 0,
      hits: 0,
      misses: 0,
      evictions: 0,
      expirations: 0,
    };
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private evictOne(strategy: EvictionStrategy): void {
    let keyToEvict: string | undefined;

    if (strategy === 'lru') {
      keyToEvict = this.findLRU();
    } else if (strategy === 'lfu') {
      keyToEvict = this.findLFU();
    } else if (strategy === 'fifo') {
      keyToEvict = this.findFIFO();
    } else if (strategy === 'ttl') {
      keyToEvict = this.findNearestExpiry();
    }

    if (keyToEvict) {
      const entry = this.store.get(keyToEvict);
      this.store.delete(keyToEvict);
      this.stats.evictions++;
      if (entry) {
        this.config.onEvict(keyToEvict, entry);
      }
    }
  }

  private findLRU(): string | undefined {
    let oldest: string | undefined;
    let oldestTime = Infinity;

    for (const [key, entry] of this.store.entries()) {
      if (entry.lastAccess < oldestTime) {
        oldestTime = entry.lastAccess;
        oldest = key;
      }
    }

    return oldest;
  }

  private findLFU(): string | undefined {
    let least: string | undefined;
    let leastCount = Infinity;

    for (const [key, entry] of this.store.entries()) {
      if (entry.accessCount < leastCount) {
        leastCount = entry.accessCount;
        least = key;
      }
    }

    return least;
  }

  private findFIFO(): string | undefined {
    return this.store.keys().next().value;
  }

  private findNearestExpiry(): string | undefined {
    let nearest: string | undefined;
    let nearestExpiry = Infinity;

    for (const [key, entry] of this.store.entries()) {
      const expiry = entry.timestamp + entry.ttl;
      if (expiry < nearestExpiry) {
        nearestExpiry = expiry;
        nearest = key;
      }
    }

    return nearest;
  }
}
