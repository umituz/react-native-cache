/**
 * TTL Cache
 * Time-to-live cache with automatic cleanup
 */

import { Cache } from '../domain/Cache';
import type { CacheConfig } from '../domain/types/Cache';

export class TTLCache<T = unknown> extends Cache<T> {
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(config: CacheConfig & { cleanupIntervalMs?: number } = {}) {
    super(config);

    const cleanupIntervalMs = config.cleanupIntervalMs || 60000; // 1 minute
    this.startCleanup(cleanupIntervalMs);
  }

  private startCleanup(intervalMs: number): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, intervalMs);
  }

  private cleanup(): void {
    const keys = this.keys();
    for (const key of keys) {
      this.get(key); // This will auto-delete expired entries
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
