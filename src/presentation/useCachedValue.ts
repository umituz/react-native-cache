/**
 * useCachedValue Hook
 */

import { useCallback, useEffect, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
import type { CacheConfig } from '../domain/types/Cache';

export function useCachedValue<T>(
  cacheName: string,
  key: string,
  fetcher: () => Promise<T>,
  config?: CacheConfig & { ttl?: number }
) {
  const [value, setValue] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadValue = useCallback(async () => {
    const cache = cacheManager.getCache<T>(cacheName, config);
    const cached = cache.get(key);

    if (cached !== undefined) {
      setValue(cached);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetcher();
      cache.set(key, data, config?.ttl);
      setValue(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [cacheName, key, config?.ttl, fetcher]);

  useEffect(() => {
    loadValue();
  }, [loadValue]);

  const invalidate = useCallback(() => {
    const cache = cacheManager.getCache<T>(cacheName);
    cache.delete(key);
    setValue(undefined);
  }, [cacheName, key]);

  const invalidatePattern = useCallback((pattern: string): number => {
    const cache = cacheManager.getCache<T>(cacheName);
    const count = cache.invalidatePattern(pattern);
    setValue(undefined);
    return count;
  }, [cacheName]);

  const refetch = useCallback(() => {
    setValue(undefined);
    loadValue();
  }, [loadValue]);

  return {
    value,
    isLoading,
    error,
    invalidate,
    invalidatePattern,
    refetch,
  };
}
