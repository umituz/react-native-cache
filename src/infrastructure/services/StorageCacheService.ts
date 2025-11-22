/**
 * Storage Cache Service
 * Infrastructure layer - Service for persistent cache operations
 */

import type { IStorageCacheRepository } from '../../application/ports/IStorageCacheRepository';
import type { CachedData } from '../../domain/entities/CachedData';

/**
 * Storage cache service
 * Handles persistent cache operations with expiry
 */
export class StorageCacheService {
  constructor(private readonly repository: IStorageCacheRepository) {}

  /**
   * Get cached data if valid, otherwise return null
   */
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.repository.get<T>(key);
    if (!cached) {
      return null;
    }

    return cached.data;
  }

  /**
   * Cache data with expiry
   */
  async set<T>(key: string, data: T, expiryMs: number): Promise<void> {
    await this.repository.set(key, data, expiryMs);
  }

  /**
   * Get or fetch data with cache
   * Returns cached data if valid, otherwise calls fetcher and caches result
   */
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    expiryMs: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const data = await fetcher();
    await this.set(key, data, expiryMs);
    return data;
  }

  /**
   * Clear cache for a key
   */
  async clear(key: string): Promise<void> {
    await this.repository.remove(key);
  }

  /**
   * Check if cache is valid
   */
  async isValid(key: string): Promise<boolean> {
    return this.repository.isValid(key);
  }
}

