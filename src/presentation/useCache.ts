/**
 * useCache Hook
 */

import { useCallback, useEffect, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
import type { CacheConfig } from '../domain/types/Cache';

export function useCache<T>(cacheName: string, config?: CacheConfig) {
  const cache = cacheManager.getCache<T>(cacheName, config);
  const [, forceUpdate] = useState({});

  const set = useCallback(
    (key: string, value: T, ttl?: number) => {
      cache.set(key, value, ttl);
      forceUpdate({});
    },
    [cache]
  );

  const get = useCallback(
    (key: string): T | undefined => {
      return cache.get(key);
    },
    [cache]
  );

  const has = useCallback(
    (key: string): boolean => {
      return cache.has(key);
    },
    [cache]
  );

  const remove = useCallback(
    (key: string): boolean => {
      const result = cache.delete(key);
      forceUpdate({});
      return result;
    },
    [cache]
  );

  const clear = useCallback(() => {
    cache.clear();
    forceUpdate({});
  }, [cache]);

  const invalidatePattern = useCallback(
    (pattern: string): number => {
      const count = cache.invalidatePattern(pattern);
      forceUpdate({});
      return count;
    },
    [cache]
  );

  const getStats = useCallback(() => {
    return cache.getStats();
  }, [cache]);

  return {
    set,
    get,
    has,
    remove,
    clear,
    invalidatePattern,
    getStats,
  };
}
