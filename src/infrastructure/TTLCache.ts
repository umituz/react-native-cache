/**
 * TTL Cache
 * Time-to-live cache with automatic cleanup
 */

import { Cache } from '../domain/Cache';
import type { CacheConfig } from '../domain/types/Cache';

export class TTLCache<T = unknown> extends Cache<T> {
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  constructor(config: CacheConfig & { cleanupIntervalMs?: number } = {}) {
    super(config);

    const cleanupIntervalMs = config.cleanupIntervalMs || 60000;
    this.startCleanup(cleanupIntervalMs);
  }

  private startCleanup(intervalMs: number): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, intervalMs);
  }

  private cleanup(): void {
    const keys = this.keys();
    let cleanedCount = 0;
    
    for (const key of keys) {
      if (this.get(key) === undefined) {
        cleanedCount++;
      }
    }
    
    if (__DEV__ && cleanedCount > 0) {
      console.log(`TTLCache: Cleaned up ${cleanedCount} expired entries`);
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
}
