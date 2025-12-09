/**
 * Cached Data Entity
 * Domain layer - Business logic for cached data structure
 */

/**
 * Cached data structure with timestamp
 */
export interface CachedData<T> {
  data: T;
  timestamp: number;
  expiry?: number;
}

/**
 * Cache metadata
 */
export interface CacheMetadata {
  key: string;
  timestamp: number;
  expiry: number;
  hitCount?: number;
  lastAccessed?: number;
}

