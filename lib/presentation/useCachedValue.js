/**
 * useCachedValue Hook
 */
import { useEffect, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
export function useCachedValue(cacheName, key, fetcher, config) {
    const [value, setValue] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const cache = cacheManager.getCache(cacheName, config);
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
    }, [cacheName, key, config?.ttl, fetcher]);
    const invalidate = () => {
        const cache = cacheManager.getCache(cacheName);
        cache.delete(key);
        setValue(undefined);
    };
    const invalidatePattern = (pattern) => {
        const cache = cacheManager.getCache(cacheName);
        const count = cache.invalidatePattern(pattern);
        setValue(undefined);
        return count;
    };
    return {
        value,
        isLoading,
        error,
        invalidate,
        invalidatePattern,
    };
}
//# sourceMappingURL=useCachedValue.js.map