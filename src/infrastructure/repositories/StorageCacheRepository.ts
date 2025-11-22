/**
 * Storage Cache Repository
 * Infrastructure layer - Implementation using storage package
 */

import type { IStorageCacheRepository } from '../../application/ports/IStorageCacheRepository';
import type { CachedData } from '../../domain/entities/CachedData';
import type { IStorageRepository } from '@umituz/react-native-storage';

/**
 * Storage cache repository implementation
 * Uses storage package for persistent cache
 */
export class StorageCacheRepository implements IStorageCacheRepository {
  constructor(private readonly storage: IStorageRepository) {}

  async get<T>(key: string): Promise<CachedData<T> | null> {
    const result = await this.storage.getItem<CachedData<T> | null>(key, null);
    if (!result.success || !result.data) {
      return null;
    }

    const cached = result.data;

    // Check if cache is expired
    if (cached.expiry && Date.now() > cached.expiry) {
      return null;
    }

    return cached;
  }

  async set<T>(key: string, data: T, expiryMs: number): Promise<void> {
    const cached: CachedData<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + expiryMs,
    };

    await this.storage.setItem(key, cached);
  }

  async remove(key: string): Promise<void> {
    await this.storage.removeItem(key);
  }

  async clear(): Promise<void> {
    // Note: Storage package clearAll is optional
    // This would need to be implemented at app level if needed
  }

  async isValid(key: string): Promise<boolean> {
    const cached = await this.get(key);
    return cached !== null;
  }
}

