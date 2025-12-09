/**
 * Cache Key Builder
 * Domain layer - Business logic for cache key generation
 *
 * Single Responsibility: Generate consistent cache keys
 */

/**
 * Cache Key Builder
 * Centralized cache key generation
 */
export class CacheKeyBuilder {
  /**
   * Build cache key with prefix
   */
  static build(prefix: string, ...parts: (string | number | undefined)[]): string {
    const validParts = parts.filter((part) => part !== undefined && part !== null);
    if (validParts.length === 0) {
      return prefix;
    }
    return `${prefix}_${validParts.join('_')}`;
  }

  /**
   * Build user-specific cache key
   */
  static buildUserKey(prefix: string, userId: string, ...parts: (string | number | undefined)[]): string {
    return this.build(prefix, userId, ...parts);
  }

  /**
   * Build query cache key
   */
  static buildQueryKey(prefix: string, ...queryParams: (string | number | undefined)[]): string {
    return this.build(prefix, ...queryParams);
  }
}

