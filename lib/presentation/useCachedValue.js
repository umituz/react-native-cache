/**
 * useCachedValue Hook
 */
import { useCallback, useEffect, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
export function useCachedValue(cacheName, key, fetcher, config) {
    const [value, setValue] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadValue = useCallback(async () => {
        const cache = cacheManager.getCache(cacheName, config);
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
        }
        catch (err) {
            setError(err);
        }
        finally {
            setIsLoading(false);
        }
    }, [cacheName, key, config?.ttl, fetcher]);
    useEffect(() => {
        loadValue();
    }, [loadValue]);
    const invalidate = useCallback(() => {
        const cache = cacheManager.getCache(cacheName);
        cache.delete(key);
        setValue(undefined);
    }, [cacheName, key]);
    const invalidatePattern = useCallback((pattern) => {
        const cache = cacheManager.getCache(cacheName);
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
//# sourceMappingURL=useCachedValue.js.map