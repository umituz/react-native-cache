/**
 * useCachedValue Hook
 */

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const cache = cacheManager.getCache<T>(cacheName, config);
    const cached = cache.get(key);

    if (cached !== undefined) {
      setValue(cached);
      return;
    }

    setIsLoading(true);
    fetcher()
      .then((data) => {
        cache.set(key, data, config?.ttl);
        setValue(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cacheName, key, config?.ttl]);

  const invalidate = () => {
    const cache = cacheManager.getCache<T>(cacheName);
    cache.delete(key);
    setValue(undefined);
  };

  return {
    value,
    isLoading,
    error,
    invalidate,
  };
}
