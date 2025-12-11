/**
 * useCache Hook
 */
import { useCallback, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
export function useCache(cacheName, config) {
    const cache = cacheManager.getCache(cacheName, config);
    const [, forceUpdate] = useState({});
    const set = useCallback((key, value, ttl) => {
        cache.set(key, value, ttl);
        forceUpdate({});
    }, [cache]);
    const get = useCallback((key) => {
        return cache.get(key);
    }, [cache]);
    const has = useCallback((key) => {
        return cache.has(key);
    }, [cache]);
    const remove = useCallback((key) => {
        const result = cache.delete(key);
        forceUpdate({});
        return result;
    }, [cache]);
    const clear = useCallback(() => {
        cache.clear();
        forceUpdate({});
    }, [cache]);
    const invalidatePattern = useCallback((pattern) => {
        const count = cache.invalidatePattern(pattern);
        forceUpdate({});
        return count;
    }, [cache]);
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
//# sourceMappingURL=useCache.js.map