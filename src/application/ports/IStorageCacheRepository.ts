/**
 * Storage Cache Repository Interface
 * Application layer - Port for storage cache operations
 */

import type { CachedData } from '../../domain/entities/CachedData';

/**
 * Interface for persistent storage cache operations
 */
export interface IStorageCacheRepository {
  /**
   * Get cached data from storage
   */
  get<T>(key: string): Promise<CachedData<T> | null>;

  /**
   * Save data to storage cache
   */
  set<T>(key: string, data: T, expiryMs: number): Promise<void>;

  /**
   * Remove cached data from storage
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all cached data
   */
  clear(): Promise<void>;

  /**
   * Check if cache exists and is valid
   */
  isValid(key: string): Promise<boolean>;
}

